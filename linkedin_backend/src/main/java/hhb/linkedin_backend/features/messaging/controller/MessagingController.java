package hhb.linkedin_backend.features.messaging.controller;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.messaging.dto.MessageDto;
import hhb.linkedin_backend.features.messaging.model.Conversation;
import hhb.linkedin_backend.features.messaging.model.Message;
import hhb.linkedin_backend.features.messaging.service.MessagingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messaging")
@RequiredArgsConstructor
public class MessagingController {
    private final MessagingService messagingService;

    // 获取用户的会话列表
    @GetMapping("/conversations")
    public List<Conversation> getConversations(
            @RequestAttribute("AuthenticatedUser")AuthenticationUser user
    ){
        return messagingService.getConversationsOfUser(user);
    }

    @GetMapping("/conversations/user/{userId}")
    public Conversation getConversationByUserId(
            @RequestAttribute("AuthenticatedUser")AuthenticationUser user,
            @PathVariable Long userId
    ){
        return messagingService.getConversationWithSomeone(user, userId);
    }

    @GetMapping("/conversation/{conversationId}")
    public Conversation getConversation(
            @RequestAttribute("AuthenticatedUser")AuthenticationUser user,
            @PathVariable Long conversationId
    ){
        return messagingService.getConversation(user, conversationId);
    }

    @PostMapping("/conversations")
    public Conversation createConversationAndAddMessage(
            @RequestAttribute("AuthenticatedUser")AuthenticationUser sender,
            @RequestBody MessageDto messageDto
    ){
        return messagingService.createConversationAndAddMessage(sender, messageDto.getReceiverId(), messageDto.getContent());
    }

    @PostMapping("/conversations/{conversationId}/messages")
    public Message sendMessage(
            @RequestAttribute("AuthenticatedUser")AuthenticationUser sender,
            @PathVariable Long conversationId,
            @RequestBody MessageDto messageDto
    ){
        return messagingService.sendMessageToConversation(
                conversationId, sender, messageDto.getReceiverId(), messageDto.getContent());
    }

    @PutMapping("/conversations/messages/{messageID}")
    public Message markMessageRead(
            @RequestAttribute("AuthenticatedUser")AuthenticationUser user,
            @PathVariable Long messageID
    ){
        return messagingService.markMessageAsRead(user, messageID);
    }

}
