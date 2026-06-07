package com.skillcollab.dto;

import com.skillcollab.model.Profile;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDTO {
    private Long id;
    private String bio;
    private String profilePicture;
    private String location;
    private String experienceLevel;
    private Integer profileCompletionPercentage;
    private String socialLinks;
    private Set<String> skills;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
