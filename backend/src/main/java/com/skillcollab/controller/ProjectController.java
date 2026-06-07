package com.skillcollab.controller;

import com.skillcollab.dto.ProjectDTO;
import com.skillcollab.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(
            @RequestBody ProjectDTO projectDTO,
            Principal principal) {
        log.info("Creating new project by user: {}", principal.getName());
        // TODO: Get actual user ID from principal
        ProjectDTO created = projectService.createProject(1L, projectDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long projectId) {
        log.info("Fetching project: {}", projectId);
        return ResponseEntity.ok(projectService.getProjectById(projectId));
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllActiveProjects() {
        log.info("Fetching all active projects");
        return ResponseEntity.ok(projectService.getActiveProjects());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProjectDTO>> getUserProjects(@PathVariable Long userId) {
        log.info("Fetching projects for user: {}", userId);
        return ResponseEntity.ok(projectService.getProjectsByUser(userId));
    }

    @GetMapping("/creator/{creatorId}")
    public ResponseEntity<List<ProjectDTO>> getCreatorProjects(@PathVariable Long creatorId) {
        log.info("Fetching projects created by user: {}", creatorId);
        return ResponseEntity.ok(projectService.getProjectsByCreator(creatorId));
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectDTO> updateProject(
            @PathVariable Long projectId,
            @RequestBody ProjectDTO projectDTO) {
        log.info("Updating project: {}", projectId);
        return ResponseEntity.ok(projectService.updateProject(projectId, projectDTO));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long projectId) {
        log.info("Deleting project: {}", projectId);
        projectService.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{projectId}/collaborators/{collaboratorId}")
    public ResponseEntity<String> addCollaborator(
            @PathVariable Long projectId,
            @PathVariable Long collaboratorId) {
        log.info("Adding collaborator {} to project {}", collaboratorId, projectId);
        projectService.addCollaborator(projectId, collaboratorId);
        return ResponseEntity.ok("Collaborator added successfully");
    }

    @DeleteMapping("/{projectId}/collaborators/{collaboratorId}")
    public ResponseEntity<String> removeCollaborator(
            @PathVariable Long projectId,
            @PathVariable Long collaboratorId) {
        log.info("Removing collaborator {} from project {}", collaboratorId, projectId);
        projectService.removeCollaborator(projectId, collaboratorId);
        return ResponseEntity.ok("Collaborator removed successfully");
    }
}
