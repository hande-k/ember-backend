package de.ember.ember.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// RegisterRequest.java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private String name;
    private String surname;
    private Integer age;
    private String city;
    private String genresLikeToRead;
    private String genresLikeToListen;
    private String genresLikeToWrite;
}
