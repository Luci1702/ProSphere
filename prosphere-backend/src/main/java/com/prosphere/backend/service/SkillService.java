package com.prosphere.backend.service;

import com.prosphere.backend.model.Skill;
import com.prosphere.backend.model.User;
import com.prosphere.backend.repository.SkillRepository;
import com.prosphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public SkillService(SkillRepository skillRepository, UserRepository userRepository) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
    }

    public List<Skill> getSkillsByUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return skillRepository.findByUser(user);
    }

    public Skill addSkill(Skill skill, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        skill.setUser(user);
        return skillRepository.save(skill);
    }

    public Skill updateSkill(Long id, int progress) {
        Skill skill = skillRepository.findById(id).orElseThrow();
        skill.setProgress(progress);
        return skillRepository.save(skill);
    }
}
