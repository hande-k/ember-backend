package de.ember.ember.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long genreId;

    @Column(nullable = false, unique = true)
    private String genreName;

    @Column
    private String defaultVoiceActor;
}
