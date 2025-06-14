package model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Project {
    @Id
    private String id;
    private String title;
    @ManyToOne
    private User owner;
}