package com.prosphere.backend.service;

import com.prosphere.backend.model.Job;
import com.prosphere.backend.model.User;
import com.prosphere.backend.repository.JobRepository;
import com.prosphere.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobService(JobRepository jobRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job createJob(Job job, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        job.setPostedBy(user);
        return jobRepository.save(job);
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElseThrow();
    }
}
