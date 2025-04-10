package hhb.linkedin_backend.features.messaging.dto;

import lombok.Data;

@Data
public class MessageDto {
    private Long receiverId;
    private String content;
}
