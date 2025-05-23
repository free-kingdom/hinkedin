package hhb.linkedin_backend.features.feed.controller;

import hhb.linkedin_backend.dto.GeneralResponse;
import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.feed.dto.CommentDTO;
import hhb.linkedin_backend.features.feed.dto.PostDTO;
import hhb.linkedin_backend.features.feed.model.Comment;
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

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(feedService.getAllPosts());
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
        return new GeneralResponse("推文删除成功");
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

    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<List<Comment>> getComments(
            @PathVariable Long postId
    ){
        return ResponseEntity.ok(feedService.getPostComments(postId));
    }

    @PostMapping("/posts/{postId}/comment")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long postId,
            @RequestBody CommentDTO commentDTO,
            @RequestAttribute("AuthenticatedUser") AuthenticationUser user
    ) {
        return ResponseEntity.ok(feedService.addComment(postId, user.getId(), commentDTO));
    }

    @GetMapping("/comments/{commentId}")
    public ResponseEntity<Comment> getComment(@PathVariable long commentId) {
        return ResponseEntity.ok(feedService.getCommentById(commentId));
    }

    @DeleteMapping("/comments/{commentId}")
    public GeneralResponse deleteComment(@PathVariable Long commentId) {
        feedService.deleteComment(commentId);
        return new GeneralResponse("评论删除成功");
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Comment> editComment(
            @PathVariable Long commentId,
            @RequestBody CommentDTO commentDTO,
            @RequestAttribute("AuthenticatedUser") AuthenticationUser user
    ) {
        return ResponseEntity.ok(feedService.editComment(commentId, commentDTO, user));
    }
}
