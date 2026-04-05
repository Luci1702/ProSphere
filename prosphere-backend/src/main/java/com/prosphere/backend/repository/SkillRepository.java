package com.prosphere.backend.repository;

import com.prosphere.backend.model.Skill;
import com.prosphere.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByUser(User user);
}
