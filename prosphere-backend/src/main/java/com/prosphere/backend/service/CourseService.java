package com.prosphere.backend.service;

import com.prosphere.backend.model.Course;
import com.prosphere.backend.model.User;
import com.prosphere.backend.repository.CourseRepository;
import com.prosphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CourseService(CourseRepository courseRepository, UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public List<Course> getCoursesByUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return courseRepository.findByUser(user);
    }

    public Course enrollInCourse(Course course, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        course.setUser(user);
        return courseRepository.save(course);
    }

    public Course updateProgress(Long id, int progress, String meta) {
        Course course = courseRepository.findById(id).orElseThrow();
        course.setProgress(progress);
        course.setMeta(meta);
        return courseRepository.save(course);
    }
}
