/*
数据库实体类，jpa可根据该类生成对应数据库的存储形式
*/

package hhb.linkedin_backend.features.authentication.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "users")   // 表名为users
public class AuthenticationUser {
    // primary key
    @Id
    private Long id;
    private String email;
    private String password;
}
