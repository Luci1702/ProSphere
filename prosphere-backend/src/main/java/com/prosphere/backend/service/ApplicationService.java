package com.prosphere.backend.service;

import com.prosphere.backend.model.Application;
import com.prosphere.backend.model.Job;
import com.prosphere.backend.model.User;
import com.prosphere.backend.repository.ApplicationRepository;
import com.prosphere.backend.repository.JobRepository;
import com.prosphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository, UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    public List<Application> getApplicationsByUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return applicationRepository.findByUser(user);
    }

    public Application applyForJob(Long jobId, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Job job = jobRepository.findById(jobId).orElseThrow();
        
        Application application = Application.builder()
                .job(job)
                .user(user)
                .status("Applied")
                .statusClass("s-applied")
                .build();
        
        return applicationRepository.save(application);
    }

    public Application updateApplicationStatus(Long id, String status, String statusClass) {
        Application application = applicationRepository.findById(id).orElseThrow();
        application.setStatus(status);
        application.setStatusClass(statusClass);
        return applicationRepository.save(application);
    }
}
