package hhb.linkedin_backend.features.authentication.repository;

import hhb.linkedin_backend.features.authentication.model.AuthenticationUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationUserRepository extends JpaRepository<AuthenticationUser, Long> {

}
