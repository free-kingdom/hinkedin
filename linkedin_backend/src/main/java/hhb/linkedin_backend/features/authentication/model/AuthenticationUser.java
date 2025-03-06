/*
数据库实体类，jpa可根据该类生成对应数据库的存储形式
*/

package hhb.linkedin_backend.features.authentication.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true) // for JPA
@Entity(name = "users")   // 表名为users
public class AuthenticationUser {
    // primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Email
    @Column(unique = true)
    private final String email;
    @JsonIgnore
    private final String password;

    private boolean emailVerified = false;
    private String emailVerificationToken = null;
    private LocalDateTime emailVerificationTokenExpiryDate = null;
    private String passwordResetToken = null;
    private LocalDateTime passwordResetTokenExpiryDate = null;
}
