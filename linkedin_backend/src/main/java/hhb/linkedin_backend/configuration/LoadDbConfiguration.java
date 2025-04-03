package hhb.linkedin_backend.configuration;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.repository.AuthenticationUserRepository;
import hhb.linkedin_backend.features.authentication.utils.Encoder;
import hhb.linkedin_backend.features.feed.model.Comment;
import hhb.linkedin_backend.features.feed.model.Post;
import hhb.linkedin_backend.features.feed.repo.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
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
        user.setEmailVerified(true);
        return user;
    }

    private Post createPost(String content, String picture, AuthenticationUser author,
                            Set<AuthenticationUser> likes, List<Comment> comments) {
        Post post = new Post();
        post.setContent(content);
        post.setPicture(picture);
        post.setAuthor(author);
        post.setLikes(likes);
        for (Comment comment : comments) {
            comment.setPost(post);
        }
        post.setComments(comments);
        return post;
    }

    private Comment createComment(String content, AuthenticationUser author) {
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setAuthor(author);
        return comment;
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
                    createUser("wangyichen@example.com", "pass", null,
                            "奕辰", "王", "华为技术有限公司", "人工智能研究员", "深圳"),
                    createUser("liuxinyu@example.com", "pass", null,
                            "昕宇", "刘", "阿里云计算有限公司", "算法工程师", "杭州"),
                    createUser("chenhaoran@example.com", "pass", null,
                            "浩然", "陈", "腾讯科技（深圳）有限公司", "产品经理", "深圳"),
                    createUser("zhangrui@example.com", "pass", null,
                            "睿", "张", "字节跳动有限公司", "高级架构师", "北京"),
                    createUser("zhaomengjie@example.com", "pass", null,
                            "梦洁", "赵", "百度在线网络技术（北京）有限公司", "研究科学家", "北京")
            };

            for (AuthenticationUser user : users) {
                userRepository.save(user);
            }

            // test posts
            Post[] posts = {
                    createPost("探索 AI 在自然语言处理中的新进展，Transformer 依然是核心，但多模态学习的发展令人兴奋！", null,
                            users[0], generateLikes(users), List.of(
                                    createComment("确实，最近看到一些关于 AI + 多模态的论文，感觉前景很广阔。", users[1]),
                                    createComment("有没有推荐的论文？最近在关注这个方向。", users[4]))),

            createPost("云计算的演进方向会是无服务器架构（Serverless）吗？边缘计算的崛起可能会带来新的挑战与机遇。", null,
                    users[1], generateLikes(users), List.of(
                            createComment("Serverless 确实让开发更高效，不过对高性能计算应用来说，还存在一定瓶颈。", users[3]),
                            createComment("边缘计算和 Serverless 结合可能会带来新机遇，期待更多探索！", users[0]),
                            createComment("最近 AWS 也在推广 Serverless + AI，不知道性能表现如何。", users[2]))),

            createPost("产品经理的日常：在用户需求、技术可行性和商业目标之间找到最优解。最近在优化产品体验，欢迎交流！", null,
                    users[2], generateLikes(users), List.of(
                            createComment("用户体验真的很重要，很多产品在细节打磨上能再提升一个层级。", users[4]),
                            createComment("最近在用 A/B 测试优化用户转化率，效果还不错。", users[1]))),

            createPost("高并发系统架构设计的挑战：如何优化数据库性能？分库分表、缓存策略、异步处理，各有利弊。", null,
                    users[3], generateLikes(users), List.of(
                            createComment("数据库分片是个不错的策略，不过事务管理会变得更复杂。", users[0]),
                            createComment("有没有推荐的中间件？想了解更多实践经验。", users[2]),
                            createComment("高并发下缓存穿透和击穿也是个问题，缓存设计很关键。", users[4]))),

            createPost("最近在研究自动驾驶算法，数据标注和仿真测试仍然是核心挑战。强化学习的应用会越来越多！", null,
                    users[4], generateLikes(users), List.of(
                            createComment("自动驾驶确实是 AI 应用的一大挑战，期待未来突破。", users[2])))
            };

            for (Post post : posts) {
                postRepository.save(post);
            }

        };
    }
}
