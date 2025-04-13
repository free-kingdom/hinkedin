package hhb.linkedin_backend.features.messaging.service;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.service.AuthenticationService;
import hhb.linkedin_backend.features.messaging.model.Conversation;
import hhb.linkedin_backend.features.messaging.model.Message;
import hhb.linkedin_backend.features.messaging.repo.ConversationRepo;
import hhb.linkedin_backend.features.messaging.repo.MessageRepo;
import hhb.linkedin_backend.features.notifications.service.NotificationsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessagingService {
    private final ConversationRepo conversationRepo;
    private final MessageRepo messageRepo;
    private final AuthenticationService authenticationService;
    private final NotificationsService notificationsService;

    public List<Conversation> getConversationsOfUser(AuthenticationUser user) {
        return conversationRepo.findByAuthorOrRecipient(user, user);
    }

    public Conversation getConversation(AuthenticationUser user, Long conversationId) {
        Conversation conversation = conversationRepo.findById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("会话不存在"));
        if (!conversation.getAuthor().getId().equals(user.getId())
                && !conversation.getRecipient().getId().equals(user.getId())) {
            throw new IllegalArgumentException("会话不属于用户");
        }
        return conversation;
    }

    public Conversation getConversationWithSomeone(AuthenticationUser user, Long someoneId){
        AuthenticationUser someone = authenticationService.getUserById(someoneId);
        Optional<Conversation> result = conversationRepo.findByAuthorAndRecipient(user, someone);
        if (result.isPresent()){
            return result.get();
        }
        result = conversationRepo.findByAuthorAndRecipient(someone, user);
        if (result.isPresent()){
            return result.get();
        }
        throw new IllegalArgumentException("会话不存在");
    }

    @Transactional
    public Conversation createConversationAndAddMessage(AuthenticationUser sender, Long receiverId, String content) {
        AuthenticationUser receiver = authenticationService.getUserById(receiverId);
        // 查找sender和receiver之间是否存在会话，如果存在则抛出异常
        conversationRepo.findByAuthorAndRecipient(sender, receiver).ifPresentOrElse(
                conversation -> {
                    throw new IllegalArgumentException("会话已存在，使用会话id发送消息");
                },
                () -> {}
        );
        conversationRepo.findByAuthorAndRecipient(receiver, sender).ifPresentOrElse(
                conversation -> {
                    throw new IllegalArgumentException("会话已存在，使用会话id发送消息");
                },
                () -> {}
        );

        Conversation conversation = new Conversation();
        conversation.setAuthor(sender);
        conversation.setRecipient(receiver);

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setConversation(conversation);

        conversation.getMessages().add(message);
        conversation = conversationRepo.save(conversation);

        // messageRepo.save(message);
        notificationsService.sendConversationToUsers(sender.getId(), receiver.getId(), conversation);
        return conversation;

    }

    @Transactional
    public Message sendMessageToConversation(Long conversationId, AuthenticationUser user,
                                             Long receiverId, String content) {

        AuthenticationUser receiver = authenticationService.getUserById(receiverId);
        Conversation conversation = conversationRepo.findById(conversationId)
                .orElseThrow(()-> new IllegalArgumentException("会话不存在"));

        if ((conversation.getAuthor().getId().equals(user.getId()) && conversation.getRecipient().getId().equals(receiver.getId()))
                || (conversation.getAuthor().getId().equals(receiver.getId()) && conversation.getRecipient().getId().equals(user.getId()))) {
            Message message = new Message();
            message.setSender(user);
            message.setReceiver(receiver);
            message.setContent(content);
            message.setConversation(conversation);
            message = messageRepo.save(message);
            conversation.getMessages().add(message);
            notificationsService.sendConversationToUsers(user.getId(), receiver.getId(), conversation);
            notificationsService.sendMessageToConversation(conversation.getId(), message);

            return message;
        } else {
            throw new IllegalArgumentException("会话不属于用户和接收者双方");
        }
    }

    public Message markMessageAsRead(AuthenticationUser user, Long messageID) {
        Message message = messageRepo.findById(messageID).orElseThrow(() -> new IllegalArgumentException("消息不存在"));
        if (!message.getReceiver().getId().equals(user.getId())) {
            throw new IllegalArgumentException("该消息不属于用户");
        }
        message.setRead(true);
        messageRepo.save(message);
        notificationsService.sendMessageToConversation(message.getConversation().getId(), message);
        notificationsService.sendConversationToUsers(user.getId(), message.getReceiver().getId(), message.getConversation());
        return message;
    }
}
