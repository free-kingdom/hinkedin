/*
可以从编写controller的代码开始实现功能
*/

package hhb.linkedin_backend.features.authentication.controller;

import hhb.linkedin_backend.features.authentication.dto.AuthenticationRequestBody;
import hhb.linkedin_backend.features.authentication.dto.AuthenticationResponseBody;
import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authentication")   // api访问前缀
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @GetMapping("/user")
    public AuthenticationUser getUser() {
        return authenticationService.getUser("hhb@rof.org");
    }


    // @Valid会验证AuthenticationRequestBody是否满足要求，否则不会验证
    @PostMapping("/register")
    public AuthenticationResponseBody register(@Valid @RequestBody AuthenticationRequestBody registerRequestBody) {
        return authenticationService.register(registerRequestBody);
    }
}
