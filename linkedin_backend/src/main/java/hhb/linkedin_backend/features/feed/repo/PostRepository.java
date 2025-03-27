package hhb.linkedin_backend.features.feed.repo;

import hhb.linkedin_backend.features.feed.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthorIdOrderByCreatedAtDesc(Long authorId);
    List<Post> findByAuthorIdNotOrderByCreatedAtDesc(Long authorId);
}
