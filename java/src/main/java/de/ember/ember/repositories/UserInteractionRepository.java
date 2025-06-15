package de.ember.ember.repositories;

import de.ember.ember.model.UserInteraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserInteractionRepository extends JpaRepository<UserInteraction, Long> {
    List<UserInteraction> findByBook_BookIdAndAction(Long bookId, UserInteraction.ActionType action);
}
