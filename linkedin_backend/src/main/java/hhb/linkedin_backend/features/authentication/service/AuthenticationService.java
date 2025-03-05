package hhb.linkedin_backend.features.authentication.service;

// 对controller隐藏database的行为，使用service的方式提供服务（多加了一层）

import hhb.linkedin_backend.features.authentication.dto.AuthenticationRequestBody;
import hhb.linkedin_backend.features.authentication.dto.AuthenticationResponseBody;
import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.repository.AuthenticationUserRepository;
import hhb.linkedin_backend.features.authentication.utils.Encoder;
import hhb.linkedin_backend.features.authentication.utils.JsonWebToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    // spring会autowire获取这个repo
    private final JsonWebToken jsonWebToken;
    private final AuthenticationUserRepository authenticationUserRepository;
    private final Encoder encoder;

    public AuthenticationUser getUser(String email) {
        return authenticationUserRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("no user"));
    }

    public AuthenticationResponseBody register(AuthenticationRequestBody authenticationRequestBody) {
        authenticationUserRepository.save(
                new AuthenticationUser(authenticationRequestBody.getEmail(),
                        encoder.encode(authenticationRequestBody.getPassword())));
        String token = jsonWebToken.generateToken(authenticationRequestBody.getEmail());
        return new AuthenticationResponseBody(token, "注册成功");
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
