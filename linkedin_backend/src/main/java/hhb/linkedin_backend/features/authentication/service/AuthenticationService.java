package hhb.linkedin_backend.features.authentication.service;

// 对controller隐藏database的行为，使用service的方式提供服务（多加了一层）

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.repository.AuthenticationUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    // spring会autowire获取这个repo
    private final AuthenticationUserRepository authenticationUserRepository;

    public AuthenticationUser getUser(String email) {
        return authenticationUserRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("no user"));
    }

}
