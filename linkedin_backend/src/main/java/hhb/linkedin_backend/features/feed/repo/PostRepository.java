package hhb.linkedin_backend.features.feed.repo;

import hhb.linkedin_backend.features.feed.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
