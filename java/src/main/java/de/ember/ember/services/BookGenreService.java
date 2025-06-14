package de.ember.ember.services;

import de.ember.ember.model.BookGenre;
import de.ember.ember.repositories.BookGenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookGenreService {

    @Autowired
    private BookGenreRepository bookGenreRepository;

    public List<BookGenre> findAll() {
        return bookGenreRepository.findAll();
    }

    public Optional<BookGenre> findById(Long id) {
        return bookGenreRepository.findById(id);
    }

    public BookGenre save(BookGenre bookGenre) {
        return bookGenreRepository.save(bookGenre);
    }

    public void delete(Long id) {
        bookGenreRepository.deleteById(id);
    }
}
