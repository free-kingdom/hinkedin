package hhb.linkedin_backend.features.notifications.service;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.feed.model.Comment;
import hhb.linkedin_backend.features.notifications.model.Notification;
import hhb.linkedin_backend.features.notifications.model.NotificationType;
import hhb.linkedin_backend.features.notifications.repo.NotificationsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class NotificationsService {
    private final NotificationsRepository notificationsRepository;
    private final SimpMessagingTemplate messagingTemplate;
    public List<Notification> getNotifications(AuthenticationUser user) {
        return notificationsRepository.findByRecipientOrderByCreatedAt(user);
    }

    public Notification markNotificationRead(Long notificationId) {
        Notification notification = notificationsRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("通知不存在"));
        notification.setRead(true);
        messagingTemplate.convertAndSend("/topic/users/" + notification.getRecipient().getId() + "/notifications",
                notification);
        return notificationsRepository.save(notification);
    }

    public void sendLikeNotification(AuthenticationUser actor, AuthenticationUser recipient, Long resourceId) {
        if (actor.getId().equals(recipient.getId())) {
            return;
        }
        Notification notification = new Notification();
        notification.setActor(actor);
        notification.setRecipient(recipient);
        notification.setResourceId(resourceId);
        notification.setType(NotificationType.LIKE);

        messagingTemplate.convertAndSend("/topic/users/" + recipient.getId() + "/notifications",
                notificationsRepository.save(notification));
    }



    public void sendCommentNotification(AuthenticationUser actor, AuthenticationUser recipient, Long resourceId) {
        if (actor.getId().equals(recipient.getId())) {
            return;
        }
        Notification notification = new Notification();
        notification.setActor(actor);
        notification.setRecipient(recipient);
        notification.setResourceId(resourceId);
        notification.setType(NotificationType.COMMENT);

        messagingTemplate.convertAndSend("/topic/users/" + recipient.getId() + "/notifications",
                notificationsRepository.save(notification));
    }

    public void sendCommentsToPost(Long postId, Comment comment) {
        messagingTemplate.convertAndSend("/topic/comments/" + postId, comment);
    }

    public void sendLikesToPost(Long postId, Set<AuthenticationUser> likes) {
        messagingTemplate.convertAndSend("/topic/likes/" + postId, likes);
    }
}
