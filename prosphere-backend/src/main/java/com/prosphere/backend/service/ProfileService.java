package com.prosphere.backend.service;

import com.prosphere.backend.model.Profile;
import com.prosphere.backend.model.User;
import com.prosphere.backend.repository.ProfileRepository;
import com.prosphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public Profile getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return profileRepository.findById(user.getId()).orElseThrow();
    }

    public Profile updateProfile(String email, Profile updatedProfile) {
        Profile profile = getProfileByEmail(email);
        profile.setFirstName(updatedProfile.getFirstName());
        profile.setLastName(updatedProfile.getLastName());
        profile.setBio(updatedProfile.getBio());
        profile.setLocation(updatedProfile.getLocation());
        profile.setJobTitle(updatedProfile.getJobTitle());
        profile.setCompany(updatedProfile.getCompany());
        profile.setSkills(updatedProfile.getSkills());
        return profileRepository.save(profile);
    }
}
