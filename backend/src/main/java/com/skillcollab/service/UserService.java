package com.skillcollab.service;

import com.skillcollab.dto.UserDTO;
import com.skillcollab.dto.ProfileDTO;
import com.skillcollab.model.User;
import com.skillcollab.model.Profile;
import com.skillcollab.model.Skill;
import com.skillcollab.repository.UserRepository;
import com.skillcollab.repository.ProfileRepository;
import com.skillcollab.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;

    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(user);
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return convertToDTO(user);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<UserDTO> getActiveUsers() {
        return userRepository.findByIsActiveTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProfileDTO getProfileByUserId(Long userId) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found for user: " + userId));
        return convertProfileToDTO(profile);
    }

    public ProfileDTO updateProfile(Long userId, ProfileDTO profileDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setBio(profileDTO.getBio());
        profile.setLocation(profileDTO.getLocation());
        profile.setProfilePicture(profileDTO.getProfilePicture());
        profile.setSocialLinks(profileDTO.getSocialLinks());

        if (profileDTO.getExperienceLevel() != null) {
            profile.setExperienceLevel(Profile.ExperienceLevel.valueOf(profileDTO.getExperienceLevel()));
        }

        // Update skills if provided
        if (profileDTO.getSkills() != null && !profileDTO.getSkills().isEmpty()) {
            Set<Skill> skills = profileDTO.getSkills()
                    .stream()
                    .map(skillName -> skillRepository.findByName(skillName)
                            .orElseGet(() -> skillRepository.save(Skill.builder()
                                    .name(skillName)
                                    .category("General")
                                    .build())))
                    .collect(Collectors.toSet());
            user.setSkills(skills);
            userRepository.save(user);
        }

        // Calculate profile completion
        int completionPercentage = calculateProfileCompletion(profile);
        profile.setProfileCompletionPercentage(completionPercentage);

        Profile updatedProfile = profileRepository.save(profile);
        log.info("Profile updated for user: {}", userId);

        return convertProfileToDTO(updatedProfile);
    }

    public List<UserDTO> searchUsersBySkills(List<String> skillNames) {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getSkills().stream()
                        .anyMatch(skill -> skillNames.contains(skill.getName())))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .isActive(user.getIsActive())
                .build();
    }

    private ProfileDTO convertProfileToDTO(Profile profile) {
        Set<String> skillNames = profile.getUser().getSkills()
                .stream()
                .map(Skill::getName)
                .collect(Collectors.toSet());

        return ProfileDTO.builder()
                .id(profile.getId())
                .bio(profile.getBio())
                .profilePicture(profile.getProfilePicture())
                .location(profile.getLocation())
                .experienceLevel(profile.getExperienceLevel() != null ? 
                        profile.getExperienceLevel().toString() : "BEGINNER")
                .profileCompletionPercentage(profile.getProfileCompletionPercentage())
                .socialLinks(profile.getSocialLinks())
                .skills(skillNames)
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }

    private int calculateProfileCompletion(Profile profile) {
        int percentage = 20; // Base percentage after signup

        if (profile.getBio() != null && !profile.getBio().isEmpty()) percentage += 15;
        if (profile.getProfilePicture() != null) percentage += 15;
        if (profile.getLocation() != null) percentage += 10;
        if (profile.getExperienceLevel() != null) percentage += 10;
        if (profile.getUser().getSkills() != null && !profile.getUser().getSkills().isEmpty()) percentage += 15;
        if (profile.getSocialLinks() != null && !profile.getSocialLinks().isEmpty()) percentage += 10;

        return Math.min(percentage, 100);
    }
}
