package hhb.linkedin_backend.features.feed.service;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.repository.AuthenticationUserRepository;
import hhb.linkedin_backend.features.feed.dto.PostDTO;
import hhb.linkedin_backend.features.feed.model.Post;
import hhb.linkedin_backend.features.feed.repo.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final PostRepository postRepository;
    private final AuthenticationUserRepository userRepository;

    public Post createPost(PostDTO postDTO, long authorId) {
        AuthenticationUser author = userRepository.findById(authorId)
                .orElseThrow(()-> new IllegalArgumentException("用户不存在"));
        Post post = new Post(postDTO.getContent(), postDTO.getPicture(), author);
        return postRepository.save(post);
    }

    public Post editPost(long postId, PostDTO postDTO, long authorId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post不存在"));
        AuthenticationUser user = userRepository.findById(authorId)
                .orElseThrow(()-> new IllegalArgumentException("用户不存在"));
        if (!post.getAuthor().equals(user)) {
            throw new IllegalArgumentException("Post不属于用户");
        }
        post.setContent(postDTO.getContent());
        post.setPicture(postDTO.getPicture());
        return postRepository.save(post);

    }

    public ResponseEntity<List<Post>> getAllPostsByUser(Long userId) {
        return ResponseEntity.ok(postRepository.findByAuthorIdOrderByCreatedAtDesc(userId));
    }
}
