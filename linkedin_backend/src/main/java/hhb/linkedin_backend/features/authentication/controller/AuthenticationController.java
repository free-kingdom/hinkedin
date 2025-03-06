/*
可以从编写controller的代码开始实现功能
*/

package hhb.linkedin_backend.features.authentication.controller;

import hhb.linkedin_backend.dto.GeneralResponse;
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

    // 使用jwt手动 protecting the route
    @GetMapping("/user")
    public AuthenticationUser getUser(@RequestAttribute("AuthenticatedUser") AuthenticationUser user) {
        return authenticationService.getUser(user.getEmail());
    }

    // @Valid会验证AuthenticationRequestBody是否满足要求，否则不会验证
    @PostMapping("/register")
    public AuthenticationResponseBody register(@Valid @RequestBody AuthenticationRequestBody registerRequestBody) {
        return authenticationService.register(registerRequestBody);
    }

    @PostMapping("/login")
    public AuthenticationResponseBody login(@Valid @RequestBody AuthenticationRequestBody loginRequestBody) {
        return authenticationService.login(loginRequestBody);
    }

    @PutMapping("/validate-email-verification-token")
    public GeneralResponse validateEmailVerificationToken(
            @RequestParam String token,
            @RequestAttribute("AuthenticatedUser") AuthenticationUser user) {
        authenticationService.verifyEmailToken(token, user.getEmail());
        return new GeneralResponse("邮箱验证成功");
    }

}
