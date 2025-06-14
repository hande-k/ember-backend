package de.ember.ember.controllers;

import de.ember.ember.model.UserInteraction;
import de.ember.ember.services.UserInteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interaction")
public class UserInteractionController {

    @Autowired
    private UserInteractionService userInteractionService;

    @PostMapping("/create")
    public ResponseEntity<UserInteraction> createInteraction(@RequestBody UserInteraction interaction) {
        return ResponseEntity.ok(userInteractionService.save(interaction));
    }

    @GetMapping("/user/{userId}")
    public List<UserInteraction> getInteractionsByUser(@PathVariable Integer userId) {
        return userInteractionService.findByUserId(userId);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteInteraction(@PathVariable Long id) {
        userInteractionService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public List<UserInteraction> getAllInteractions() {
        return userInteractionService.findAll();
    }
}
