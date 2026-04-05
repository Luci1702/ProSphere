package com.prosphere.backend.controller;

import com.prosphere.backend.model.Application;
import com.prosphere.backend.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<Application>> getApplications(Authentication authentication) {
        return ResponseEntity.ok(applicationService.getApplicationsByUser(authentication.getName()));
    }

    @PostMapping("/{jobId}")
    public ResponseEntity<Application> apply(@PathVariable Long jobId, Authentication authentication) {
        return ResponseEntity.ok(applicationService.applyForJob(jobId, authentication.getName()));
    }
}
