package com.prosphere.backend.controller;

import com.prosphere.backend.model.Skill;
import com.prosphere.backend.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getSkills(Authentication authentication) {
        return ResponseEntity.ok(skillService.getSkillsByUser(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<Skill> addSkill(@RequestBody Skill skill, Authentication authentication) {
        return ResponseEntity.ok(skillService.addSkill(skill, authentication.getName()));
    }
}
