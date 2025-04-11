package hhb.linkedin_backend.features.notifications.service;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.feed.model.Comment;
import hhb.linkedin_backend.features.messaging.model.Conversation;
import hhb.linkedin_backend.features.messaging.model.Message;
import hhb.linkedin_backend.features.notifications.model.Notification;
import hhb.linkedin_backend.features.notifications.model.NotificationType;
import hhb.linkedin_backend.features.notifications.repo.NotificationsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationsService {
    private final NotificationsRepository notificationsRepository;
    private final SimpMessagingTemplate messagingTemplate;
    public List<Notification> getNotifications(AuthenticationUser user) {
        return notificationsRepository.findByRecipientOrderByCreatedAtDesc(user);
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
        log.info("Sending like notification");
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

    public void sendConversationToUsers(Long senderId, Long receiverId, Conversation conversation) {
        messagingTemplate.convertAndSend("/topic/users/" + senderId + "/conversations", conversation);
        messagingTemplate.convertAndSend("/topic/users/" + receiverId + "/conversations", conversation);
    }

    public void sendMessageToConversation(Long conversationId, Message message) {
        messagingTemplate.convertAndSend("/topic/conversations/" + conversationId, message);
    }
}
