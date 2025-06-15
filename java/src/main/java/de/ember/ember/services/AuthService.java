package de.ember.ember.services;

import de.ember.ember.model.dto.LoginRequest;
import de.ember.ember.model.dto.LoginResponse;
import de.ember.ember.model.dto.RegisterRequest;
import de.ember.ember.model.User;
import de.ember.ember.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public LoginResponse register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .surname(request.getSurname())
                .age(request.getAge())
                .city(request.getCity())
                .genresLikeToRead(request.getGenresLikeToRead())
                .genresLikeToListen(request.getGenresLikeToListen())
                .genresLikeToWrite(request.getGenresLikeToWrite())
                .build();

        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return LoginResponse.builder().token(jwtToken).build();
    }


    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        // If authentication is successful, generate a token
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(); // User is guaranteed to exist at this point
        var jwtToken = jwtService.generateToken(user);
        return LoginResponse.builder().token(jwtToken).build();
    }
}