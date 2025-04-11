package hhb.linkedin_backend.features.messaging.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private AuthenticationUser sender;
    @ManyToOne
    private AuthenticationUser receiver;

    private String content;
    private boolean isRead;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // optional 指定对应的外键不能为null, 即每个message必须都对应有一个conversation
    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Conversation conversation;
}
