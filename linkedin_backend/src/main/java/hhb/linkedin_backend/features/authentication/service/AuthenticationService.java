package hhb.linkedin_backend.features.authentication.service;

// 对controller隐藏database的行为，使用service的方式提供服务（多加了一层）

import hhb.linkedin_backend.features.authentication.dto.AuthenticationRequestBody;
import hhb.linkedin_backend.features.authentication.dto.AuthenticationResponseBody;
import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.repository.AuthenticationUserRepository;
import hhb.linkedin_backend.features.authentication.utils.EmailService;
import hhb.linkedin_backend.features.authentication.utils.Encoder;
import hhb.linkedin_backend.features.authentication.utils.JsonWebToken;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    // spring会autowire获取这个repo
    private final JsonWebToken jsonWebToken;
    private final AuthenticationUserRepository authenticationUserRepository;
    private final Encoder encoder;
    private final EmailService emailService;
    private static final int durationInMinutes = 5;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    public AuthenticationUser getUser(String email) {
        return authenticationUserRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("no user"));
    }

    // 注册时验证邮箱
    public void sendEmailVerificationToken(String email) {
        var userOptional = authenticationUserRepository.findByEmail(email);
        if (userOptional.isPresent() && !userOptional.get().isEmailVerified()) {
            var user = userOptional.get();
            String emailValidationToken = EmailService.generateEmailVerificationToken();
            String hashedEmailValidationToken = encoder.encode(emailValidationToken);
            user.setEmailVerificationToken(hashedEmailValidationToken);
            user.setEmailVerificationTokenExpiryDate(LocalDateTime.now().plusMinutes(durationInMinutes));
            authenticationUserRepository.save(user);

            String subject = "Hinkedin用户注册邮箱验证";
            String body = String.format("""
                输入6位数字：<strong>%s</strong> 进行邮箱验证，请在%d分钟内进行操作。
                """, emailValidationToken, durationInMinutes);
            try {
                emailService.sendEmail(email, subject, body);
            } catch (Exception e) {
                logger.info("Error while sending email: {}", e.getMessage());
            }
        } else {
            throw new IllegalArgumentException("用户不存在或邮箱已验证");
        }
    }

    public void verifyEmailToken(String token, String email) {
       var userOptional = authenticationUserRepository.findByEmail(email);
       if (userOptional.isPresent()) {
           var user = userOptional.get();
           if (encoder.matches(token, user.getEmailVerificationToken())
                   && !user.getEmailVerificationTokenExpiryDate().isBefore(LocalDateTime.now())) {
               user.setEmailVerified(true);
               user.setEmailVerificationToken(null);
               user.setEmailVerificationTokenExpiryDate(null);
               authenticationUserRepository.save(user);
           } else {
               throw new IllegalArgumentException("验证码错误或已过期");
           }
       } else {
           throw new IllegalArgumentException("用户不存在");
       }
    }

    public AuthenticationResponseBody register(AuthenticationRequestBody authenticationRequestBody) {
        authenticationUserRepository.save(new AuthenticationUser(
                authenticationRequestBody.getEmail(),
                encoder.encode(authenticationRequestBody.getPassword())));
        sendEmailVerificationToken(authenticationRequestBody.getEmail());
        String token = jsonWebToken.generateToken(authenticationRequestBody.getEmail());
        return new AuthenticationResponseBody(token, "注册成功，待验证邮箱");
    }

    public AuthenticationResponseBody login(AuthenticationRequestBody authenticationRequestBody) {
        var user = authenticationUserRepository.findByEmail(authenticationRequestBody.getEmail())
                .orElseThrow(()-> new IllegalArgumentException("邮箱不正确"));
        if (!encoder.matches(authenticationRequestBody.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("密码错误");
        }
        String token = jsonWebToken.generateToken(user.getEmail());
        return new AuthenticationResponseBody(token, "登录成功");
    }
}
