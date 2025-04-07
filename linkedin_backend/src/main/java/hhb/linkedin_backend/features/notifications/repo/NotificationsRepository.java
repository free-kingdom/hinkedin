package hhb.linkedin_backend.features.notifications.repo;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.notifications.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationsRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientOrderByCreatedAt(AuthenticationUser recipient);

}
