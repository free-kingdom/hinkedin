package hhb.linkedin_backend.features.feed.repo;

import hhb.linkedin_backend.features.feed.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthorIdOrderByCreatedAtDesc(Long authorId);
    List<Post> findByAuthorIdNotOrderByCreatedAtDesc(Long authorId);

    @Modifying
    @Query("UPDATE posts p SET p.commentsCount = p.commentsCount + 1 WHERE p.id = :id")
    int incrementCommentCount(@Param("id") Long id);

    @Modifying
    @Query("UPDATE posts p SET p.commentsCount = p.commentsCount - 1 WHERE p.id = :id")
    int decrementCommentCount(@Param("id") Long id);

}
