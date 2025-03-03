package hhb.linkedin_backend.configuration;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.repository.AuthenticationUserRepository;
import hhb.linkedin_backend.features.authentication.utils.Encoder;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class LoadDbConfiguration {
    private final Encoder encoder;

    @Bean
    public CommandLineRunner initDatabase(AuthenticationUserRepository userRepository) {
        return args -> {
            AuthenticationUser authenticationUser =
                    new AuthenticationUser("hhb@rof.org", encoder.encode("password"));
            userRepository.save(authenticationUser);
        };
    }
}
