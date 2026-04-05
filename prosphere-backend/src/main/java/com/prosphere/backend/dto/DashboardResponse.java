package com.prosphere.backend.dto;

import java.util.List;

public class DashboardResponse {
    private String name;
    private String role;
    private List<StatDto> stats;
    private List<ApplicationDto> applications;
    private List<CourseDto> courses;
    private List<SkillDto> skills;
    private List<JobDto> savedJobs;

    public DashboardResponse() {
    }

    public DashboardResponse(String name, String role, List<StatDto> stats, List<ApplicationDto> applications, List<CourseDto> courses, List<SkillDto> skills, List<JobDto> savedJobs) {
        this.name = name;
        this.role = role;
        this.stats = stats;
        this.applications = applications;
        this.courses = courses;
        this.skills = skills;
        this.savedJobs = savedJobs;
    }

    public static DashboardResponseBuilder builder() {
        return new DashboardResponseBuilder();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<StatDto> getStats() {
        return stats;
    }

    public void setStats(List<StatDto> stats) {
        this.stats = stats;
    }

    public List<ApplicationDto> getApplications() {
        return applications;
    }

    public void setApplications(List<ApplicationDto> applications) {
        this.applications = applications;
    }

    public List<CourseDto> getCourses() {
        return courses;
    }

    public void setCourses(List<CourseDto> courses) {
        this.courses = courses;
    }

    public List<SkillDto> getSkills() {
        return skills;
    }

    public void setSkills(List<SkillDto> skills) {
        this.skills = skills;
    }

    public List<JobDto> getSavedJobs() {
        return savedJobs;
    }

    public void setSavedJobs(List<JobDto> savedJobs) {
        this.savedJobs = savedJobs;
    }

    public static class DashboardResponseBuilder {
        private String name;
        private String role;
        private List<StatDto> stats;
        private List<ApplicationDto> applications;
        private List<CourseDto> courses;
        private List<SkillDto> skills;
        private List<JobDto> savedJobs;

        DashboardResponseBuilder() {
        }

        public DashboardResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public DashboardResponseBuilder role(String role) {
            this.role = role;
            return this;
        }

        public DashboardResponseBuilder stats(List<StatDto> stats) {
            this.stats = stats;
            return this;
        }

        public DashboardResponseBuilder applications(List<ApplicationDto> applications) {
            this.applications = applications;
            return this;
        }

        public DashboardResponseBuilder courses(List<CourseDto> courses) {
            this.courses = courses;
            return this;
        }

        public DashboardResponseBuilder skills(List<SkillDto> skills) {
            this.skills = skills;
            return this;
        }

        public DashboardResponseBuilder savedJobs(List<JobDto> savedJobs) {
            this.savedJobs = savedJobs;
            return this;
        }

        public DashboardResponse build() {
            return new DashboardResponse(name, role, stats, applications, courses, skills, savedJobs);
        }
    }

    public static class StatDto {
        private String icon;
        private String val;
        private String label;
        private String change;
        private boolean up;
        private String color;
        private String border;

        public StatDto() {
        }

        public StatDto(String icon, String val, String label, String change, boolean up, String color, String border) {
            this.icon = icon;
            this.val = val;
            this.label = label;
            this.change = change;
            this.up = up;
            this.color = color;
            this.border = border;
        }

        public static StatDtoBuilder builder() {
            return new StatDtoBuilder();
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        public String getVal() {
            return val;
        }

        public void setVal(String val) {
            this.val = val;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getChange() {
            return change;
        }

        public void setChange(String change) {
            this.change = change;
        }

        public boolean isUp() {
            return up;
        }

        public void setUp(boolean up) {
            this.up = up;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }

        public String getBorder() {
            return border;
        }

        public void setBorder(String border) {
            this.border = border;
        }

        public static class StatDtoBuilder {
            private String icon;
            private String val;
            private String label;
            private String change;
            private boolean up;
            private String color;
            private String border;

            StatDtoBuilder() {
            }

            public StatDtoBuilder icon(String icon) {
                this.icon = icon;
                return this;
            }

            public StatDtoBuilder val(String val) {
                this.val = val;
                return this;
            }

            public StatDtoBuilder label(String label) {
                this.label = label;
                return this;
            }

            public StatDtoBuilder change(String change) {
                this.change = change;
                return this;
            }

            public StatDtoBuilder up(boolean up) {
                this.up = up;
                return this;
            }

            public StatDtoBuilder color(String color) {
                this.color = color;
                return this;
            }

            public StatDtoBuilder border(String border) {
                this.border = border;
                return this;
            }

            public StatDto build() {
                return new StatDto(icon, val, label, change, up, color, border);
            }
        }
    }

    public static class ApplicationDto {
        private String logo;
        private String bg;
        private String color;
        private String title;
        private String company;
        private String status;
        private String cls;

        public ApplicationDto() {
        }

        public ApplicationDto(String logo, String bg, String color, String title, String company, String status, String cls) {
            this.logo = logo;
            this.bg = bg;
            this.color = color;
            this.title = title;
            this.company = company;
            this.status = status;
            this.cls = cls;
        }

        public static ApplicationDtoBuilder builder() {
            return new ApplicationDtoBuilder();
        }

        public String getLogo() {
            return logo;
        }

        public void setLogo(String logo) {
            this.logo = logo;
        }

        public String getBg() {
            return bg;
        }

        public void setBg(String bg) {
            this.bg = bg;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getCompany() {
            return company;
        }

        public void setCompany(String company) {
            this.company = company;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getCls() {
            return cls;
        }

        public void setCls(String cls) {
            this.cls = cls;
        }

        public static class ApplicationDtoBuilder {
            private String logo;
            private String bg;
            private String color;
            private String title;
            private String company;
            private String status;
            private String cls;

            ApplicationDtoBuilder() {
            }

            public ApplicationDtoBuilder logo(String logo) {
                this.logo = logo;
                return this;
            }

            public ApplicationDtoBuilder bg(String bg) {
                this.bg = bg;
                return this;
            }

            public ApplicationDtoBuilder color(String color) {
                this.color = color;
                return this;
            }

            public ApplicationDtoBuilder title(String title) {
                this.title = title;
                return this;
            }

            public ApplicationDtoBuilder company(String company) {
                this.company = company;
                return this;
            }

            public ApplicationDtoBuilder status(String status) {
                this.status = status;
                return this;
            }

            public ApplicationDtoBuilder cls(String cls) {
                this.cls = cls;
                return this;
            }

            public ApplicationDto build() {
                return new ApplicationDto(logo, bg, color, title, company, status, cls);
            }
        }
    }

    public static class CourseDto {
        private String emoji;
        private String bg;
        private String title;
        private String meta;
        private int pct;

        public CourseDto() {
        }

        public CourseDto(String emoji, String bg, String title, String meta, int pct) {
            this.emoji = emoji;
            this.bg = bg;
            this.title = title;
            this.meta = meta;
            this.pct = pct;
        }

        public static CourseDtoBuilder builder() {
            return new CourseDtoBuilder();
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

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getMeta() {
            return meta;
        }

        public void setMeta(String meta) {
            this.meta = meta;
        }

        public int getPct() {
            return pct;
        }

        public void setPct(int pct) {
            this.pct = pct;
        }

        public static class CourseDtoBuilder {
            private String emoji;
            private String bg;
            private String title;
            private String meta;
            private int pct;

            CourseDtoBuilder() {
            }

            public CourseDtoBuilder emoji(String emoji) {
                this.emoji = emoji;
                return this;
            }

            public CourseDtoBuilder bg(String bg) {
                this.bg = bg;
                return this;
            }

            public CourseDtoBuilder title(String title) {
                this.title = title;
                return this;
            }

            public CourseDtoBuilder meta(String meta) {
                this.meta = meta;
                return this;
            }

            public CourseDtoBuilder pct(int pct) {
                this.pct = pct;
                return this;
            }

            public CourseDto build() {
                return new CourseDto(emoji, bg, title, meta, pct);
            }
        }
    }

    public static class SkillDto {
        private String name;
        private int pct;
        private String color;

        public SkillDto() {
        }

        public SkillDto(String name, int pct, String color) {
            this.name = name;
            this.pct = pct;
            this.color = color;
        }

        public static SkillDtoBuilder builder() {
            return new SkillDtoBuilder();
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getPct() {
            return pct;
        }

        public void setPct(int pct) {
            this.pct = pct;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }

        public static class SkillDtoBuilder {
            private String name;
            private int pct;
            private String color;

            SkillDtoBuilder() {
            }

            public SkillDtoBuilder name(String name) {
                this.name = name;
                return this;
            }

            public SkillDtoBuilder pct(int pct) {
                this.pct = pct;
                return this;
            }

            public SkillDtoBuilder color(String color) {
                this.color = color;
                return this;
            }

            public SkillDto build() {
                return new SkillDto(name, pct, color);
            }
        }
    }

    public static class JobDto {
        private String logo;
        private String bg;
        private String color;
        private String title;
        private String meta;

        public JobDto() {
        }

        public JobDto(String logo, String bg, String color, String title, String meta) {
            this.logo = logo;
            this.bg = bg;
            this.color = color;
            this.title = title;
            this.meta = meta;
        }

        public static JobDtoBuilder builder() {
            return new JobDtoBuilder();
        }

        public String getLogo() {
            return logo;
        }

        public void setLogo(String logo) {
            this.logo = logo;
        }

        public String getBg() {
            return bg;
        }

        public void setBg(String bg) {
            this.bg = bg;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getMeta() {
            return meta;
        }

        public void setMeta(String meta) {
            this.meta = meta;
        }

        public static class JobDtoBuilder {
            private String logo;
            private String bg;
            private String color;
            private String title;
            private String meta;

            JobDtoBuilder() {
            }

            public JobDtoBuilder logo(String logo) {
                this.logo = logo;
                return this;
            }

            public JobDtoBuilder bg(String bg) {
                this.bg = bg;
                return this;
            }

            public JobDtoBuilder color(String color) {
                this.color = color;
                return this;
            }

            public JobDtoBuilder title(String title) {
                this.title = title;
                return this;
            }

            public JobDtoBuilder meta(String meta) {
                this.meta = meta;
                return this;
            }

            public JobDto build() {
                return new JobDto(logo, bg, color, title, meta);
            }
        }
    }
}
