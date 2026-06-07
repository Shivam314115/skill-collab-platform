package com.skillcollab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.skillcollab"})
public class SkillCollabApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillCollabApplication.class, args);
    }
}
