/*
数据库实体类，jpa可根据该类生成对应数据库的存储形式
*/

package hhb.linkedin_backend.features.authentication.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Data
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true) // for JPA
@Entity(name = "users")   // 表名为users
public class AuthenticationUser {
    // primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private final String email;
    private final String password;
}
