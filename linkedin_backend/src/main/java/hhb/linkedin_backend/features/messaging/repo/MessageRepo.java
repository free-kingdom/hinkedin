package hhb.linkedin_backend.features.messaging.repo;

import hhb.linkedin_backend.features.messaging.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepo extends JpaRepository<Message, Long> {

}
