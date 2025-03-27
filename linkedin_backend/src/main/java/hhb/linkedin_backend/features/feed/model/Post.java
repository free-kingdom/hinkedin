package hhb.linkedin_backend.features.feed.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity(name = "posts")
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String picture;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
    @PreUpdate
    private void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private AuthenticationUser author;

    @ManyToMany
    @JoinTable(
            name = "posts_likes",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    Set<AuthenticationUser> likes;

    public Post(String content, String picture, AuthenticationUser author) {
        this.content = content;
        this.picture = picture;
        this.author = author;
    }
}
