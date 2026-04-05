package com.prosphere.backend.controller;

import com.prosphere.backend.model.Profile;
import com.prosphere.backend.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<Profile> getProfile(Authentication authentication) {
        return ResponseEntity.ok(profileService.getProfileByEmail(authentication.getName()));
    }

    @PutMapping
    public ResponseEntity<Profile> updateProfile(@RequestBody Profile profile, Authentication authentication) {
        return ResponseEntity.ok(profileService.updateProfile(authentication.getName(), profile));
    }
}
