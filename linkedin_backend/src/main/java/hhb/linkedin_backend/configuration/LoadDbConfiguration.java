package hhb.linkedin_backend.configuration;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import hhb.linkedin_backend.features.authentication.repository.AuthenticationUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoadDbConfiguration {

    @Bean
    public CommandLineRunner initDatabase(AuthenticationUserRepository userRepository) {
        return args -> {
            AuthenticationUser authenticationUser = new AuthenticationUser("hhb@rof.org", "password");
            userRepository.save(authenticationUser);
        };
    }
}
