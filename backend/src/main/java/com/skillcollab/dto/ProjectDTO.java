package com.skillcollab.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDTO {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String status;
    private Long creatorId;
    private String creatorName;
    private Set<Long> collaboratorIds;
    private Set<String> requiredSkills;
    private String projectLink;
    private String repositoryUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
