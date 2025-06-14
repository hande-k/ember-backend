package de.ember.ember;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HtmlController {

    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of("hello", "world");
    }

}
