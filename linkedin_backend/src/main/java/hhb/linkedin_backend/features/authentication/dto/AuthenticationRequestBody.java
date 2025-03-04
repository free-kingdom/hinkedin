package hhb.linkedin_backend.features.authentication.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationRequestBody {
    @NotBlank(message = "邮箱不能为空")
    private final String email;           // 设置为final lombok不会生成setter
    @NotBlank(message = "密码不能为空")
    private String password;
}
