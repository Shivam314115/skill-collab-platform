package com.skillcollab.repository;

import com.skillcollab.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByCreatorId(Long creatorId);
    
    @Query("SELECT DISTINCT p FROM Project p LEFT JOIN p.collaborators c WHERE p.creator.id = :userId OR c.id = :userId")
    List<Project> findByUserAsCreatorOrCollaborator(@Param("userId") Long userId);
    
    List<Project> findByStatus(Project.ProjectStatus status);
    
    @Query("SELECT p FROM Project p WHERE p.status = 'ACTIVE'")
    List<Project> findActiveProjects();
}
