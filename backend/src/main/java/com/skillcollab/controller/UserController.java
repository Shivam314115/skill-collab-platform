package com.skillcollab.controller;

import com.skillcollab.dto.UserDTO;
import com.skillcollab.dto.ProfileDTO;
import com.skillcollab.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long userId) {
        log.info("Fetching user: {}", userId);
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        log.info("Fetching all users");
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/active")
    public ResponseEntity<List<UserDTO>> getActiveUsers() {
        log.info("Fetching active users");
        return ResponseEntity.ok(userService.getActiveUsers());
    }

    @GetMapping("/search/skills")
    public ResponseEntity<List<UserDTO>> searchBySkills(
            @RequestParam(value = "skills") List<String> skillNames) {
        log.info("Searching users by skills: {}", skillNames);
        return ResponseEntity.ok(userService.searchUsersBySkills(skillNames));
    }

    @GetMapping("/{userId}/profile")
    public ResponseEntity<ProfileDTO> getUserProfile(@PathVariable Long userId) {
        log.info("Fetching profile for user: {}", userId);
        return ResponseEntity.ok(userService.getProfileByUserId(userId));
    }

    @PutMapping("/{userId}/profile")
    public ResponseEntity<ProfileDTO> updateProfile(
            @PathVariable Long userId,
            @RequestBody ProfileDTO profileDTO) {
        log.info("Updating profile for user: {}", userId);
        return ResponseEntity.ok(userService.updateProfile(userId, profileDTO));
    }
}
