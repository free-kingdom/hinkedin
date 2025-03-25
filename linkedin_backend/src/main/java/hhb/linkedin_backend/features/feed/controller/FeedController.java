package hhb.linkedin_backend.features.feed.controller;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.feed.dto.PostDTO;
import hhb.linkedin_backend.features.feed.model.Post;
import hhb.linkedin_backend.features.feed.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feed")
@RequiredArgsConstructor
public class FeedController {
    private final FeedService feedService;

    @GetMapping
    public ResponseEntity<List<Post>> allPostsByUser(@RequestAttribute("AuthenticatedUser") AuthenticationUser user) {
        return feedService.getAllPostsByUser(user.getId());
    }

    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(
            @RequestBody PostDTO postDTO,
            @RequestAttribute("AuthenticatedUser") AuthenticationUser user
    ) {
        Post post = feedService.createPost(postDTO, user.getId());
        return ResponseEntity.ok(post);
    }

    @PutMapping("/posts/{postId}")
    public ResponseEntity<Post> editPost(
            @PathVariable long postId,
            @RequestAttribute("AuthenticatedUser") AuthenticationUser user,
            @RequestBody PostDTO postDTO
    ) {
        return ResponseEntity.ok(feedService.editPost(postId, postDTO, user.getId()));
    }
}
