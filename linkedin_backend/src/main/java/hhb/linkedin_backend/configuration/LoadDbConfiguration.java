package hhb.linkedin_backend.configuration;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.repository.AuthenticationUserRepository;
import hhb.linkedin_backend.features.authentication.utils.Encoder;
import hhb.linkedin_backend.features.feed.model.Post;
import hhb.linkedin_backend.features.feed.repo.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class LoadDbConfiguration {
    private final Encoder encoder;

    @Bean
    public CommandLineRunner initDatabase(
            AuthenticationUserRepository userRepository,
            PostRepository postRepository) {
        return args -> {
            // test users
            AuthenticationUser[] users = {
                    new AuthenticationUser("hhb@rof.org", encoder.encode("pass"),
                            "hb", "h", "学校", "学生", "Guangzhou"),
                    new AuthenticationUser("ccb@rof.org", encoder.encode("pass"),
                            "cb", "c", "学校", "学生", "Shenzhen"),
                    new AuthenticationUser("cjy@rof.org", encoder.encode("pass"),
                            "jy", "c", "公司", "研究员", "Guangzhou"),
                    new AuthenticationUser("abc@rof.org", encoder.encode("pass"),
                            "bc", "a", null, "群众", "Foshan"),
                    new AuthenticationUser("foo@rof.org", encoder.encode("pass"),
                            "oo", "f", null, "群众", "Foshan"),
                    new AuthenticationUser("bar@rof.org", encoder.encode("pass"),
                            "ar", "b", null, "群众", "Foshan")
            };
            for (AuthenticationUser user : users) {
                userRepository.save(user);
            }

            // test posts
            Post[] posts = {
                    new Post("hhb' first post", "/img/b1",
                            users[0]),
                    new Post("hhb' second post", "/img/b2",
                            users[0]),
                    new Post("ccb' first post", "/img/m1",
                            users[1]),
                    new Post("cjy的首个推文", "/img/m2",
                            users[2]),
                    new Post("abc' post: aabbcc", null,
                            users[3]),
                    new Post("foo' post: wooo", null,
                            users[4]),
                    new Post("bar: hello", null,
                            users[5]),
            };
            for (Post post : posts) {
                postRepository.save(post);
            }

        };
    }
}
