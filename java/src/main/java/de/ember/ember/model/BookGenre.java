package de.ember.ember.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bookId", nullable = false)
    private Book book;

    @ManyToOne
    @JoinColumn(name = "genreId", nullable = false)
    private Genre genre;

    @Column(nullable = false)
    private String type; // "primary" or "sub"
}
