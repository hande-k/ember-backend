package de.ember.ember.services;

import de.ember.ember.model.User;
import de.ember.ember.model.UserInteraction;
import de.ember.ember.repositories.UserInteractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserInteractionService {

    @Autowired
    private UserInteractionRepository userInteractionRepository;

    public List<UserInteraction> findAll() {
        return userInteractionRepository.findAll();
    }

    public Optional<UserInteraction> findById(Long id) {
        return userInteractionRepository.findById(id);
    }

    public UserInteraction save(UserInteraction interaction) {
        return userInteractionRepository.save(interaction);
    }

    public void delete(Long id) {
        userInteractionRepository.deleteById(id);
    }

    public List<UserInteraction> findByUserId(Integer userId) {
        return userInteractionRepository.findAll().stream()
                .filter(interaction -> interaction.getUser().getId().equals(userId))
                .collect(Collectors.toList());
    }

    public List<User> findAuthorsByBookId(Long bookId) {
        return userInteractionRepository.findByBook_BookIdAndAction(bookId, UserInteraction.ActionType.WRITE)
                .stream()
                .map(UserInteraction::getUser)
                .collect(Collectors.toList());
    }

}
