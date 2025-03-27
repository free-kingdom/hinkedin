package hhb.linkedin_backend.features.feed.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    @JsonIgnore
    private Post post;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private AuthenticationUser author;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
    @PreUpdate
    private void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
