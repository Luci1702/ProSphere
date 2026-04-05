package com.prosphere.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    private String location;
    private String description;
    private String salaryRange;
    private String type; // Full-time, Remote, etc.
    private String logo;
    private String color;
    private String bg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posted_by")
    private User postedBy;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Job() {
    }

    public Job(Long id, String title, String company, String location, String description, String salaryRange, String type, String logo, String color, String bg, User postedBy, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.description = description;
        this.salaryRange = salaryRange;
        this.type = type;
        this.logo = logo;
        this.color = color;
        this.bg = bg;
        this.postedBy = postedBy;
        this.createdAt = createdAt;
    }

    public static JobBuilder builder() {
        return new JobBuilder();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSalaryRange() {
        return salaryRange;
    }

    public void setSalaryRange(String salaryRange) {
        this.salaryRange = salaryRange;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBg() {
        return bg;
    }

    public void setBg(String bg) {
        this.bg = bg;
    }

    public User getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(User postedBy) {
        this.postedBy = postedBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static class JobBuilder {
        private Long id;
        private String title;
        private String company;
        private String location;
        private String description;
        private String salaryRange;
        private String type;
        private String logo;
        private String color;
        private String bg;
        private User postedBy;
        private LocalDateTime createdAt;

        JobBuilder() {
        }

        public JobBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public JobBuilder title(String title) {
            this.title = title;
            return this;
        }

        public JobBuilder company(String company) {
            this.company = company;
            return this;
        }

        public JobBuilder location(String location) {
            this.location = location;
            return this;
        }

        public JobBuilder description(String description) {
            this.description = description;
            return this;
        }

        public JobBuilder salaryRange(String salaryRange) {
            this.salaryRange = salaryRange;
            return this;
        }

        public JobBuilder type(String type) {
            this.type = type;
            return this;
        }

        public JobBuilder logo(String logo) {
            this.logo = logo;
            return this;
        }

        public JobBuilder color(String color) {
            this.color = color;
            return this;
        }

        public JobBuilder bg(String bg) {
            this.bg = bg;
            return this;
        }

        public JobBuilder postedBy(User postedBy) {
            this.postedBy = postedBy;
            return this;
        }

        public JobBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Job build() {
            return new Job(id, title, company, location, description, salaryRange, type, logo, color, bg, postedBy, createdAt);
        }
    }
}
