package de.ember.ember.controllers;

import de.ember.ember.model.Genre;
import de.ember.ember.model.dto.GenreDTO;
import de.ember.ember.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/genre")
public class GenreController {

    @Autowired
    private GenreService genreService;

    @PostMapping("/create")
    public ResponseEntity<Genre> createGenre(@RequestBody Genre genre) {
        return ResponseEntity.ok(genreService.save(genre));
    }

    @PostMapping
    public ResponseEntity<Genre> createGenre(@RequestBody GenreDTO genreDTO){
        Genre genre = new Genre();
        genre.setGenreName(genreDTO.genreName());
        genre.setDefaultVoiceActor(null);
        return ResponseEntity.ok(genreService.save(genre));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Genre> getGenre(@PathVariable Long id) {
        return genreService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Genre> updateGenre(@PathVariable Long id, @RequestBody Genre updatedGenre) {
        return genreService.findById(id)
                .map(genre -> {
                    updatedGenre.setGenreId(id);
                    return ResponseEntity.ok(genreService.save(updatedGenre));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteGenre(@PathVariable Long id) {
        genreService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public List<Genre> getAllGenres() {
        return genreService.findAll();
    }
}

