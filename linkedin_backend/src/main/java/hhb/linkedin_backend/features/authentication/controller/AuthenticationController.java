/*
可以从编写controller的代码开始实现功能
*/

package hhb.linkedin_backend.features.authentication.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authentication")   // api访问前缀
public class AuthenticationController {

    @GetMapping("/user")
    public String index() {
        return "user";
    }
}
