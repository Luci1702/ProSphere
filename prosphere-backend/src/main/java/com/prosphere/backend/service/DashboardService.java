package com.prosphere.backend.service;

import com.prosphere.backend.dto.DashboardResponse;
import com.prosphere.backend.model.*;
import com.prosphere.backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ApplicationRepository applicationRepository;
    private final CourseRepository courseRepository;
    private final SkillRepository skillRepository;

    public DashboardService(UserRepository userRepository, ProfileRepository profileRepository, 
                            ApplicationRepository applicationRepository, CourseRepository courseRepository, 
                            SkillRepository skillRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.applicationRepository = applicationRepository;
        this.courseRepository = courseRepository;
        this.skillRepository = skillRepository;
    }

    public DashboardResponse getDashboardData(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Profile profile = profileRepository.findByUserId(user.getId()).orElse(new Profile());

        List<Application> dbApplications = applicationRepository.findByUser(user);
        List<Course> dbCourses = courseRepository.findByUser(user);
        List<Skill> dbSkills = skillRepository.findByUser(user);

        List<DashboardResponse.StatDto> stats = new ArrayList<>();
        stats.add(DashboardResponse.StatDto.builder().icon("💼").val(String.valueOf(dbApplications.size())).label("Applications Sent").change("↑ 0 this week").up(true).color("#4A9FE0").border("rgba(74,159,224,0.2)").build());
        stats.add(DashboardResponse.StatDto.builder().icon("🎓").val(String.valueOf(dbCourses.size())).label("Courses In Progress").change("0% avg progress").up(true).color("#1D9E75").border("rgba(29,158,117,0.2)").build());
        stats.add(DashboardResponse.StatDto.builder().icon("👁️").val("0").label("Profile Views").change("↑ 0% this week").up(true).color("#9F99E8").border("rgba(127,119,221,0.2)").build());
        stats.add(DashboardResponse.StatDto.builder().icon("🔗").val("0").label("Connections").change("↑ 0 new").up(true).color("#D4537E").border("rgba(212,83,126,0.2)").build());

        List<DashboardResponse.ApplicationDto> applications = dbApplications.stream()
                .map(app -> DashboardResponse.ApplicationDto.builder()
                        .logo(app.getJob().getLogo() != null ? app.getJob().getLogo() : "J")
                        .bg(app.getJob().getBg() != null ? app.getJob().getBg() : "rgba(74,159,224,0.2)")
                        .color(app.getJob().getColor() != null ? app.getJob().getColor() : "#4A9FE0")
                        .title(app.getJob().getTitle())
                        .company(app.getJob().getCompany())
                        .status(app.getStatus())
                        .cls(app.getStatusClass())
                        .build())
                .collect(Collectors.toList());

        List<DashboardResponse.CourseDto> courses = dbCourses.stream()
                .map(c -> DashboardResponse.CourseDto.builder()
                        .emoji(c.getEmoji() != null ? c.getEmoji() : "📚")
                        .bg(c.getBg() != null ? c.getBg() : "rgba(74,159,224,0.2)")
                        .title(c.getTitle())
                        .meta(c.getMeta())
                        .pct(c.getProgress())
                        .build())
                .collect(Collectors.toList());

        List<DashboardResponse.SkillDto> skills = dbSkills.stream()
                .map(s -> DashboardResponse.SkillDto.builder()
                        .name(s.getName())
                        .pct(s.getProgress())
                        .color(s.getColor() != null ? s.getColor() : "#4A9FE0")
                        .build())
                .collect(Collectors.toList());

        List<DashboardResponse.JobDto> savedJobs = new ArrayList<>();

        return DashboardResponse.builder()
                .name(profile.getFirstName() != null ? profile.getFirstName() + " " + profile.getLastName() : user.getEmail().split("@")[0])
                .role(profile.getJobTitle() != null ? profile.getJobTitle() : "Job Seeker")
                .stats(stats)
                .applications(applications)
                .courses(courses)
                .skills(skills)
                .savedJobs(savedJobs)
                .build();
    }
}
