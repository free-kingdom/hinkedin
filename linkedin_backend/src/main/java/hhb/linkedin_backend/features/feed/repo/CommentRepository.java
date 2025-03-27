package hhb.linkedin_backend.features.feed.repo;

import hhb.linkedin_backend.features.feed.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
