package de.ember.ember.repositories;

import de.ember.ember.model.BookGenre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookGenreRepository extends JpaRepository<BookGenre, Long> {}
