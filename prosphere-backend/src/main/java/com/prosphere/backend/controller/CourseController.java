package com.prosphere.backend.controller;

import com.prosphere.backend.model.Course;
import com.prosphere.backend.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<List<Course>> getCourses(Authentication authentication) {
        return ResponseEntity.ok(courseService.getCoursesByUser(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<Course> enroll(@RequestBody Course course, Authentication authentication) {
        return ResponseEntity.ok(courseService.enrollInCourse(course, authentication.getName()));
    }
}
