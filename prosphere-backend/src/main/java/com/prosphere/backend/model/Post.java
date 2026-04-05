package com.prosphere.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private List<Comment> comments = new ArrayList<>();

    public Post() {
    }

    public Post(Long id, String content, String imageUrl, User user, LocalDateTime createdAt, List<Comment> comments) {
        this.id = id;
        this.content = content;
        this.imageUrl = imageUrl;
        this.user = user;
        this.createdAt = createdAt;
        if (comments != null) {
            this.comments = comments;
        }
    }

    public static PostBuilder builder() {
        return new PostBuilder();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public static class PostBuilder {
        private Long id;
        private String content;
        private String imageUrl;
        private User user;
        private LocalDateTime createdAt;
        private List<Comment> comments = new ArrayList<>();

        PostBuilder() {
        }

        public PostBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PostBuilder content(String content) {
            this.content = content;
            return this;
        }

        public PostBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public PostBuilder user(User user) {
            this.user = user;
            return this;
        }

        public PostBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public PostBuilder comments(List<Comment> comments) {
            this.comments = comments;
            return this;
        }

        public Post build() {
            return new Post(id, content, imageUrl, user, createdAt, comments);
        }
    }
}
