package de.ember.ember.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInteraction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long interactionId;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActionType action;

    @ManyToOne
    @JoinColumn(name = "bookID", nullable = false)
    private Book book;

    public enum ActionType {
        READ, WRITE, LISTEN, LIKE, DONTLIKE
    }
}

