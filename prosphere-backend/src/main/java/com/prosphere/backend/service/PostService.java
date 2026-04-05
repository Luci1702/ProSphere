package com.prosphere.backend.service;

import com.prosphere.backend.model.Post;
import com.prosphere.backend.model.User;
import com.prosphere.backend.repository.PostRepository;
import com.prosphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post createPost(String content, String imageUrl, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Post post = Post.builder()
                .content(content)
                .imageUrl(imageUrl)
                .user(user)
                .build();
        return postRepository.save(post);
    }

    public void deletePost(Long id, String email) {
        Post post = postRepository.findById(id).orElseThrow();
        if (!post.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }
        postRepository.delete(post);
    }
}
