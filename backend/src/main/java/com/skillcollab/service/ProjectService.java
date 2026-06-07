package com.skillcollab.service;

import com.skillcollab.dto.ProjectDTO;
import com.skillcollab.model.Project;
import com.skillcollab.model.Skill;
import com.skillcollab.model.User;
import com.skillcollab.repository.ProjectRepository;
import com.skillcollab.repository.UserRepository;
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
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public ProjectDTO createProject(Long creatorId, ProjectDTO projectDTO) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Handle required skills
        Set<Skill> skills = projectDTO.getRequiredSkills() != null ?
                projectDTO.getRequiredSkills()
                        .stream()
                        .map(skillName -> skillRepository.findByName(skillName)
                                .orElseGet(() -> skillRepository.save(Skill.builder()
                                        .name(skillName)
                                        .category("General")
                                        .build())))
                        .collect(Collectors.toSet()) :
                Set.of();

        Project project = Project.builder()
                .title(projectDTO.getTitle())
                .description(projectDTO.getDescription())
                .category(projectDTO.getCategory())
                .status(Project.ProjectStatus.ACTIVE)
                .creator(creator)
                .requiredSkills(skills)
                .projectLink(projectDTO.getProjectLink())
                .repositoryUrl(projectDTO.getRepositoryUrl())
                .collaborators(Set.of())
                .build();

        project = projectRepository.save(project);
        log.info("Project created: {} by user: {}", project.getId(), creatorId);

        return convertToDTO(project);
    }

    public ProjectDTO getProjectById(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return convertToDTO(project);
    }

    public List<ProjectDTO> getProjectsByCreator(Long creatorId) {
        return projectRepository.findByCreatorId(creatorId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProjectDTO> getProjectsByUser(Long userId) {
        return projectRepository.findByUserAsCreatorOrCollaborator(userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProjectDTO> getActiveProjects() {
        return projectRepository.findActiveProjects()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProjectDTO updateProject(Long projectId, ProjectDTO projectDTO) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setTitle(projectDTO.getTitle());
        project.setDescription(projectDTO.getDescription());
        project.setCategory(projectDTO.getCategory());
        project.setProjectLink(projectDTO.getProjectLink());
        project.setRepositoryUrl(projectDTO.getRepositoryUrl());

        if (projectDTO.getStatus() != null) {
            project.setStatus(Project.ProjectStatus.valueOf(projectDTO.getStatus()));
        }

        project = projectRepository.save(project);
        log.info("Project updated: {}", projectId);

        return convertToDTO(project);
    }

    public void deleteProject(Long projectId) {
        projectRepository.deleteById(projectId);
        log.info("Project deleted: {}", projectId);
    }

    public void addCollaborator(Long projectId, Long collaboratorId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User collaborator = userRepository.findById(collaboratorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        project.getCollaborators().add(collaborator);
        projectRepository.save(project);
        log.info("Collaborator {} added to project {}", collaboratorId, projectId);
    }

    public void removeCollaborator(Long projectId, Long collaboratorId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User collaborator = userRepository.findById(collaboratorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        project.getCollaborators().remove(collaborator);
        projectRepository.save(project);
        log.info("Collaborator {} removed from project {}", collaboratorId, projectId);
    }

    private ProjectDTO convertToDTO(Project project) {
        Set<Long> collaboratorIds = project.getCollaborators()
                .stream()
                .map(User::getId)
                .collect(Collectors.toSet());

        Set<String> skillNames = project.getRequiredSkills()
                .stream()
                .map(Skill::getName)
                .collect(Collectors.toSet());

        return ProjectDTO.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .category(project.getCategory())
                .status(project.getStatus().toString())
                .creatorId(project.getCreator().getId())
                .creatorName(project.getCreator().getFullName())
                .collaboratorIds(collaboratorIds)
                .requiredSkills(skillNames)
                .projectLink(project.getProjectLink())
                .repositoryUrl(project.getRepositoryUrl())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}
