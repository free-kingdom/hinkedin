package hhb.linkedin_backend.features.messaging.repo;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.messaging.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConversationRepo extends JpaRepository<Conversation, Long> {
    Optional<Conversation> findByAuthorAndRecipient(AuthenticationUser author, AuthenticationUser recipient);
    List<Conversation> findByAuthorOrRecipient(AuthenticationUser user1, AuthenticationUser user2);

}
