package com.prosphere.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String status; // Interview, Under Review, Applied, Offered
    private String statusClass;

    private LocalDateTime appliedAt;

    public Application() {}

    public Application(Long id, Job job, User user, String status, String statusClass, LocalDateTime appliedAt) {
        this.id = id;
        this.job = job;
        this.user = user;
        this.status = status;
        this.statusClass = statusClass;
        this.appliedAt = appliedAt;
    }

    public static ApplicationBuilder builder() {
        return new ApplicationBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getStatusClass() { return statusClass; }
    public void setStatusClass(String statusClass) { this.statusClass = statusClass; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    @PrePersist
    protected void onApply() {
        appliedAt = LocalDateTime.now();
    }

    public static class ApplicationBuilder {
        private Long id;
        private Job job;
        private User user;
        private String status;
        private String statusClass;
        private LocalDateTime appliedAt;

        public ApplicationBuilder id(Long id) { this.id = id; return this; }
        public ApplicationBuilder job(Job job) { this.job = job; return this; }
        public ApplicationBuilder user(User user) { this.user = user; return this; }
        public ApplicationBuilder status(String status) { this.status = status; return this; }
        public ApplicationBuilder statusClass(String statusClass) { this.statusClass = statusClass; return this; }
        public ApplicationBuilder appliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; return this; }

        public Application build() {
            return new Application(id, job, user, status, statusClass, appliedAt);
        }
    }
}
