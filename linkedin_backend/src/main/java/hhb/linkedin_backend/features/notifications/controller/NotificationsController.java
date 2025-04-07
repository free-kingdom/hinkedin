package hhb.linkedin_backend.features.notifications.controller;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.notifications.model.Notification;
import hhb.linkedin_backend.features.notifications.service.NotificationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationsController {
    private final NotificationsService notificationsService;

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(
            @RequestAttribute("AuthenticatedUser") AuthenticationUser user
    ) {
        return ResponseEntity.ok(notificationsService.getNotifications(user));
    }

    @PutMapping("/{notificationId}")
    public ResponseEntity<Notification> markNotificationRead(
            @PathVariable Long notificationId
    ) {
        return ResponseEntity.ok(notificationsService.markNotificationRead(notificationId));
    }
}
