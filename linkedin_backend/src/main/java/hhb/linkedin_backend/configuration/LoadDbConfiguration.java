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

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class LoadDbConfiguration {
    private final Encoder encoder;
    private final Random random = new Random();

    private AuthenticationUser createUser(String email, String password, String profilePicture,
                                          String firstName, String lastName,
                                          String company, String position, String location) {
        AuthenticationUser user = new AuthenticationUser(email, encoder.encode(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setCompany(company);
        user.setPosition(position);
        user.setLocation(location);
        user.setProfilePicture(profilePicture);
        return user;
    }

    private Post createPost(String content, String picture, AuthenticationUser author, Set<AuthenticationUser> likes){
        Post post = new Post();
        post.setContent(content);
        post.setPicture(picture);
        post.setAuthor(author);
        post.setLikes(likes);
        return post;
    }

    private Set<AuthenticationUser> generateLikes(AuthenticationUser[] users) {
        Set<AuthenticationUser> likes = new HashSet<>();
        for (AuthenticationUser user : users) {
            if (random.nextBoolean()) {
                likes.add(user);
            }
        }
        return likes;
    }

    @Bean
    public CommandLineRunner initDatabase(
            AuthenticationUserRepository userRepository,
            PostRepository postRepository) {
        return args -> {
            // test users
            AuthenticationUser[] users = {
                    createUser("hhb@rof.org", "pass", "/img/b1.jpg",
                            "hb", "h", "学校", "学生", "Guangzhou"),
                    createUser("ccb@rof.org", "pass", "/img/b2.jpg",
                            "cb", "c", "学校", "学生", "Shenzhen"),
                    createUser("cjy@rof.org", "pass", "/img/m1.jpg",
                            "jy", "c", "公司", "研究员", "Guangzhou"),
                    createUser("abc@rof.org", "pass", "/img/m2.jpg",
                            "bc", "a", null, "群众", "Foshan"),
                    createUser("foo@rof.org", "pass", "/img/b3.jpg",
                            "oo", "f", null, "群众", "Foshan"),
                    createUser("bar@rof.org", "pass", "/img/wc2.jpg",
                            "ar", "b", null, "群众", "Foshan")
            };
            for (AuthenticationUser user : users) {
                userRepository.save(user);
            }

            // test posts
            Post[] posts = {
                    createPost("我的新头像", "/img/b1",
                            users[0], generateLikes(users)),
                    createPost("下载的小鸟图片", "/img/b2",
                            users[0], generateLikes(users)),
                    createPost("我的新头像", "/img/m1",
                            users[1], generateLikes(users)),
                    createPost("我的新头像", "/img/m2",
                            users[2], generateLikes(users)),
                    createPost("阿巴阿巴", null,
                            users[3], generateLikes(users)),
                    createPost("敷哦敷哦", null,
                            users[4], generateLikes(users)),
                    createPost("敷哦阿巴阿巴", null,
                            users[5], generateLikes(users)),
            };
            for (Post post : posts) {
                postRepository.save(post);
            }

        };
    }
}
