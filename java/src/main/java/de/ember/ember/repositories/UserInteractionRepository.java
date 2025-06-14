package de.ember.ember.repositories;

import de.ember.ember.model.UserInteraction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInteractionRepository extends JpaRepository<UserInteraction, Long> {}
