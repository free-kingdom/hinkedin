package hhb.linkedin_backend.features.feed.service;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.repository.AuthenticationUserRepository;
import hhb.linkedin_backend.features.feed.dto.PostDTO;
import hhb.linkedin_backend.features.feed.model.Post;
import hhb.linkedin_backend.features.feed.repo.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final PostRepository postRepository;
    private final AuthenticationUserRepository userRepository;

    public Post createPost(PostDTO postDTO, long authorId) {
        AuthenticationUser author = userRepository.findById(authorId).get();
        Post post = new Post(postDTO.getContent(), postDTO.getPicture(), author);
        return postRepository.save(post);
    }
}
