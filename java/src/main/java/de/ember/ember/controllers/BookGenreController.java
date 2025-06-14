package de.ember.ember.controllers;

import de.ember.ember.model.BookGenre;
import de.ember.ember.services.BookGenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookgenre")
public class BookGenreController {

    @Autowired
    private BookGenreService bookGenreService;

    @PostMapping("/link")
    public ResponseEntity<BookGenre> linkGenreToBook(@RequestBody BookGenre bookGenre) {
        return ResponseEntity.ok(bookGenreService.save(bookGenre));
    }

    @DeleteMapping("/unlink/{id}")
    public ResponseEntity<Void> unlink(@PathVariable Long id) {
        bookGenreService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public List<BookGenre> getAllBookGenres() {
        return bookGenreService.findAll();
    }
}
