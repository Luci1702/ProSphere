package com.prosphere.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String emoji;
    private String bg;
    private String meta; // e.g. "42/65 lessons"
    private int progress; // percentage

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime enrolledAt;

    @PrePersist
    protected void onEnroll() {
        enrolledAt = LocalDateTime.now();
    }

    public Course() {
    }

    public Course(Long id, String title, String emoji, String bg, String meta, int progress, User user, LocalDateTime enrolledAt) {
        this.id = id;
        this.title = title;
        this.emoji = emoji;
        this.bg = bg;
        this.meta = meta;
        this.progress = progress;
        this.user = user;
        this.enrolledAt = enrolledAt;
    }

    public static CourseBuilder builder() {
        return new CourseBuilder();
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

    public String getEmoji() {
        return emoji;
    }

    public void setEmoji(String emoji) {
        this.emoji = emoji;
    }

    public String getBg() {
        return bg;
    }

    public void setBg(String bg) {
        this.bg = bg;
    }

    public String getMeta() {
        return meta;
    }

    public void setMeta(String meta) {
        this.meta = meta;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getEnrolledAt() {
        return enrolledAt;
    }

    public void setEnrolledAt(LocalDateTime enrolledAt) {
        this.enrolledAt = enrolledAt;
    }

    public static class CourseBuilder {
        private Long id;
        private String title;
        private String emoji;
        private String bg;
        private String meta;
        private int progress;
        private User user;
        private LocalDateTime enrolledAt;

        CourseBuilder() {
        }

        public CourseBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public CourseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public CourseBuilder emoji(String emoji) {
            this.emoji = emoji;
            return this;
        }

        public CourseBuilder bg(String bg) {
            this.bg = bg;
            return this;
        }

        public CourseBuilder meta(String meta) {
            this.meta = meta;
            return this;
        }

        public CourseBuilder progress(int progress) {
            this.progress = progress;
            return this;
        }

        public CourseBuilder user(User user) {
            this.user = user;
            return this;
        }

        public CourseBuilder enrolledAt(LocalDateTime enrolledAt) {
            this.enrolledAt = enrolledAt;
            return this;
        }

        public Course build() {
            return new Course(id, title, emoji, bg, meta, progress, user, enrolledAt);
        }
    }
}
