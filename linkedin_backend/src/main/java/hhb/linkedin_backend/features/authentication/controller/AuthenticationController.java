/*
可以从编写controller的代码开始实现功能
*/

package hhb.linkedin_backend.features.authentication.controller;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authentication")   // api访问前缀
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @GetMapping("/user")
    public AuthenticationUser getUser() {
        return authenticationService.getUser("hhb@rof.org");
    }
}
