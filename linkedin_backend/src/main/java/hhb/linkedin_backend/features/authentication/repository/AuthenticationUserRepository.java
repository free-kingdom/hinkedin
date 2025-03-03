package hhb.linkedin_backend.features.authentication.repository;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthenticationUserRepository extends JpaRepository<AuthenticationUser, Long> {
    // spring data jpa 自动实现该方法
    Optional<AuthenticationUser> findByEmail(String email);
}
