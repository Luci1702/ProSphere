package com.prosphere.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profiles")
public class Profile {

    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private String firstName;
    private String lastName;
    private String bio;
    private String profilePicture;
    private String location;
    private String jobTitle;
    private String company;
    private String skills;

    public Profile() {}

    public Profile(Long id, User user, String firstName, String lastName, String bio, String profilePicture, String location, String jobTitle, String company, String skills) {
        this.id = id;
        this.user = user;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
        this.profilePicture = profilePicture;
        this.location = location;
        this.jobTitle = jobTitle;
        this.company = company;
        this.skills = skills;
    }

    public static ProfileBuilder builder() {
        return new ProfileBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getProfilePicture() { return profilePicture; }
    public void setProfilePicture(String profilePicture) { this.profilePicture = profilePicture; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public static class ProfileBuilder {
        private Long id;
        private User user;
        private String firstName;
        private String lastName;
        private String bio;
        private String profilePicture;
        private String location;
        private String jobTitle;
        private String company;
        private String skills;

        public ProfileBuilder id(Long id) { this.id = id; return this; }
        public ProfileBuilder user(User user) { this.user = user; return this; }
        public ProfileBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public ProfileBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public ProfileBuilder bio(String bio) { this.bio = bio; return this; }
        public ProfileBuilder profilePicture(String profilePicture) { this.profilePicture = profilePicture; return this; }
        public ProfileBuilder location(String location) { this.location = location; return this; }
        public ProfileBuilder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
        public ProfileBuilder company(String company) { this.company = company; return this; }
        public ProfileBuilder skills(String skills) { this.skills = skills; return this; }

        public Profile build() {
            return new Profile(id, user, firstName, lastName, bio, profilePicture, location, jobTitle, company, skills);
        }
    }
}
