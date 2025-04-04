package hhb.linkedin_backend.features.feed.repo;

import hhb.linkedin_backend.features.feed.model.Comment;
import hhb.linkedin_backend.features.feed.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
}
