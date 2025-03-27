package hhb.linkedin_backend.features.feed.controller;

import hhb.linkedin_backend.dto.GeneralResponse;
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
    public ResponseEntity<List<Post>> getFeedPosts(
            @RequestAttribute("AuthenticatedUser") AuthenticationUser user
    ) {
        return ResponseEntity.ok(feedService.getFeedPosts(user.getId()));
    }

    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(
            @RequestBody PostDTO postDTO,
            @RequestAttribute("AuthenticatedUser") AuthenticationUser user
    ) {
        Post post = feedService.createPost(postDTO, user.getId());
        return ResponseEntity.ok(post);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<Post> getPost(@PathVariable long postId) {
        return ResponseEntity.ok(feedService.getPostById(postId));
    }

    @PutMapping("/posts/{postId}")
    public ResponseEntity<Post> editPost(
            @PathVariable long postId,
            @RequestAttribute("AuthenticatedUser") AuthenticationUser user,
            @RequestBody PostDTO postDTO
    ) {
        return ResponseEntity.ok(feedService.editPost(postId, postDTO, user.getId()));
    }

    @DeleteMapping("/posts/{postId}")
    public GeneralResponse deletePost(
            @PathVariable Long postId,
            @RequestAttribute("AuthenticatedUser") AuthenticationUser user
    ){
        feedService.deletePost(postId);
        return new GeneralResponse("Post删除成功");
    }

    @GetMapping("/posts/user/{userId}")
    public ResponseEntity<List<Post>> allPostsByUser(
            @PathVariable long userId) {
        return ResponseEntity.ok(feedService.getAllPostsByUser(userId));
    }


    @PutMapping("/posts/{postId}/like")
    public ResponseEntity<Post> likePost(
            @PathVariable Long postId,
            @RequestAttribute("AuthenticatedUser") AuthenticationUser user
    ){
        return ResponseEntity.ok(feedService.likePost(postId, user.getId()));
    }
}
