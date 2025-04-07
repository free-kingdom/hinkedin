/*
数据库实体类，jpa可根据该类生成对应数据库的存储形式
*/

package hhb.linkedin_backend.features.authentication.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hhb.linkedin_backend.features.feed.model.Comment;
import hhb.linkedin_backend.features.feed.model.Post;
import hhb.linkedin_backend.features.notifications.model.Notification;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
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
    private String password;

    private boolean emailVerified = false;
    @JsonIgnore
    private String emailVerificationToken = null;
    @JsonIgnore
    private LocalDateTime emailVerificationTokenExpiryDate = null;
    @JsonIgnore
    private String passwordResetToken = null;
    @JsonIgnore
    private LocalDateTime passwordResetTokenExpiryDate = null;

    private String lastName;
    private String firstName;
    private String company;
    private String position;
    private String location;
    private boolean isProfileCompleted = false;

    @JsonIgnore
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    @JsonIgnore
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> receivedNotifications;

    @JsonIgnore
    @OneToMany(mappedBy = "actor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> actedNotifications;


    private String profilePicture = null;

    private void updateIsProfileCompleted() {
        this.isProfileCompleted = (lastName != null && firstName != null && company != null && position != null && location != null);
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
        updateIsProfileCompleted();
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
        updateIsProfileCompleted();
    }

    public void setCompany(String company) {
        this.company = company;
        updateIsProfileCompleted();
    }

    public void setPosition(String position) {
        this.position = position;
        updateIsProfileCompleted();
    }

    public void setLocation(String location) {
        this.location = location;
        updateIsProfileCompleted();
    }

    public AuthenticationUser(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
