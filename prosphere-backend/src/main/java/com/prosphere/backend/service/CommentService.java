package com.prosphere.backend.service;

import com.prosphere.backend.model.Comment;
import com.prosphere.backend.model.Post;
import com.prosphere.backend.model.User;
import com.prosphere.backend.repository.CommentRepository;
import com.prosphere.backend.repository.PostRepository;
import com.prosphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
    }

    public Comment addComment(Long postId, String content, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Post post = postRepository.findById(postId).orElseThrow();
        
        Comment comment = Comment.builder()
                .content(content)
                .post(post)
                .user(user)
                .build();
                
        return commentRepository.save(comment);
    }
}
