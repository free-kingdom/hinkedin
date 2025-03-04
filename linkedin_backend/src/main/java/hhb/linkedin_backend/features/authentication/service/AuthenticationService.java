package hhb.linkedin_backend.features.authentication.service;

// 对controller隐藏database的行为，使用service的方式提供服务（多加了一层）

import hhb.linkedin_backend.features.authentication.dto.AuthenticationRequestBody;
import hhb.linkedin_backend.features.authentication.dto.AuthenticationResponseBody;
import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.repository.AuthenticationUserRepository;
import hhb.linkedin_backend.features.authentication.utils.Encoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    // spring会autowire获取这个repo
    private final AuthenticationUserRepository authenticationUserRepository;
    private final Encoder encoder;

    public AuthenticationUser getUser(String email) {
        return authenticationUserRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("no user"));
    }

    public AuthenticationResponseBody register(AuthenticationRequestBody authenticationRequestBody) {
        authenticationUserRepository.save(
                new AuthenticationUser(authenticationRequestBody.getEmail(),
                        encoder.encode(authenticationRequestBody.getPassword())));
        return new AuthenticationResponseBody("token", "Register success");
    }

}
