package com.prosphere.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private int progress; // percentage
    private String color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Skill() {
    }

    public Skill(Long id, String name, int progress, String color, User user) {
        this.id = id;
        this.name = name;
        this.progress = progress;
        this.color = color;
        this.user = user;
    }

    public static SkillBuilder builder() {
        return new SkillBuilder();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public static class SkillBuilder {
        private Long id;
        private String name;
        private int progress;
        private String color;
        private User user;

        SkillBuilder() {
        }

        public SkillBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public SkillBuilder name(String name) {
            this.name = name;
            return this;
        }

        public SkillBuilder progress(int progress) {
            this.progress = progress;
            return this;
        }

        public SkillBuilder color(String color) {
            this.color = color;
            return this;
        }

        public SkillBuilder user(User user) {
            this.user = user;
            return this;
        }

        public Skill build() {
            return new Skill(id, name, progress, color, user);
        }
    }
}
