import { useState, useEffect } from "react";
import api from "../api";
import "./UserDashboard.css";

const ICONS = {
  dashboard: "\u{1F4CA}",
  profile: "\u{1F464}",
  notifications: "\u{1F514}",
  messages: "\u{1F4AC}",
  applications: "\u{1F4BC}",
  saved: "\u{1F516}",
  resume: "\u{1F4C4}",
  courses: "\u{1F393}",
  certificates: "\u{1F3C6}",
  progress: "\u{1F4C8}",
  gigs: "\u{1F9D1}\u200D\u{1F4BB}",
  earnings: "\u{1F4B0}",
  orders: "\u{1F4E6}",
  settings: "\u2699",
  wave: "\u{1F44B}",
  search: "\u{1F50D}",
  arrowRight: "\u2192",
  sparkles: "\u2728",
  job: "\u{1F4BC}",
  learning: "\u{1F4DA}",
  profileView: "\u{1F440}",
  connection: "\u{1F91D}",
  recommendation: "\u{1F4A1}",
};

const NAV = [
  { section: "Overview", items: [
    { icon: ICONS.dashboard, label: "Dashboard" },
    { icon: ICONS.profile, label: "My Profile" },
    { icon: ICONS.notifications, label: "Notifications", badge: "5", red: true },
    { icon: ICONS.messages, label: "Messages", badge: "3", red: true },
  ] },
  { section: "Career", items: [
    { icon: ICONS.applications, label: "Job Applications", badge: "8" },
    { icon: ICONS.saved, label: "Saved Jobs" },
    { icon: ICONS.resume, label: "My Resume" },
  ] },
  { section: "Learning", items: [
    { icon: ICONS.courses, label: "My Courses" },
    { icon: ICONS.certificates, label: "Certificates" },
    { icon: ICONS.progress, label: "Skill Progress" },
  ] },
  { section: "Freelance", items: [
    { icon: ICONS.gigs, label: "My Gigs" },
    { icon: ICONS.earnings, label: "Earnings" },
    { icon: ICONS.orders, label: "Orders" },
  ] },
  { section: "Settings", items: [
    { icon: ICONS.settings, label: "Settings" },
  ] },
];

const TIMELINE = [
  { icon: ICONS.job, bg: "rgba(24,95,165,0.2)", text: <><strong>Interview scheduled</strong> with TCS for React Developer</>, time: "2h ago" },
  { icon: ICONS.learning, bg: "rgba(29,158,117,0.2)", text: <>Completed <strong>Module 7</strong> in React Masterclass</>, time: "5h ago" },
  { icon: ICONS.profileView, bg: "rgba(127,119,221,0.2)", text: <><strong>Infosys HR</strong> viewed your profile</>, time: "Yesterday" },
  { icon: ICONS.connection, bg: "rgba(186,117,23,0.2)", text: <><strong>Priya Singh</strong> accepted your connection</>, time: "Yesterday" },
  { icon: ICONS.certificates, bg: "rgba(29,158,117,0.2)", text: <>Earned <strong>React Intermediate</strong> certificate!</>, time: "2 days ago" },
];

const RECS = [
  { icon: ICONS.job, bg: "rgba(24,95,165,0.15)", title: "3 New Job Matches", sub: "Based on your React skills" },
  { icon: ICONS.learning, bg: "rgba(29,158,117,0.15)", title: "Complete React Course", sub: "65% done · 23 lessons left" },
  { icon: ICONS.gigs, bg: "rgba(127,119,221,0.15)", title: "Post a Gig", sub: "Your skills are in demand!" },
  { icon: ICONS.resume, bg: "rgba(186,117,23,0.15)", title: "Update Resume", sub: "Last updated 3 months ago" },
];

const getStatIcon = (label) => {
  const lower = label.toLowerCase();
  if (lower.includes("application") || lower.includes("job")) return ICONS.applications;
  if (lower.includes("saved")) return ICONS.saved;
  if (lower.includes("course") || lower.includes("learning")) return ICONS.courses;
  if (lower.includes("gig")) return ICONS.gigs;
  if (lower.includes("earning") || lower.includes("revenue")) return ICONS.earnings;
  if (lower.includes("message")) return ICONS.messages;
  return ICONS.dashboard;
};

const getCourseIcon = (title) => {
  const lower = title.toLowerCase();
  if (lower.includes("react")) return "\u269B";
  if (lower.includes("spring")) return "\u{1F343}";
  if (lower.includes("python")) return "\u{1F40D}";
  if (lower.includes("design")) return "\u{1F3A8}";
  return ICONS.courses;
};

export default function UserDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="db-loading">Loading ProSphere Dashboard...</div>;
  if (!data) return <div className="db-error">Error loading dashboard. Please try again.</div>;

  return (
    <div className="db-wrapper">
      <div className="ps-grid"></div>
      <div className="db-layout">
        <div className="db-sidebar">
          <div className="db-logo">ProSphere</div>
          {NAV.map((section) => (
            <div key={section.section}>
              <div className="db-nav-label">{section.section}</div>
              {section.items.map((item) => (
                <div key={item.label} className={`db-nav-item ${activeNav === item.label ? "active" : ""}`} onClick={() => setActiveNav(item.label)}>
                  <span className="db-nav-icon">{item.icon}</span>
                  {item.label}
                  {item.badge && <span className={`db-nav-badge ${item.red ? "red" : "blue"}`}>{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}
          <div className="db-sidebar-user">
            <div className="db-sidebar-av">{data.name.charAt(0).toUpperCase()}</div>
            <div>
              <div className="db-sidebar-name">{data.name}</div>
              <div className="db-sidebar-role">{data.role}</div>
            </div>
          </div>
        </div>

        <div className="db-main">
          <div className="db-topbar">
            <div>
              <h1>Good morning, {data.name.split(" ")[0]}! {ICONS.wave}</h1>
              <p>Monday, 16 March 2026 - You have {data.applications.length} active applications</p>
            </div>
            <div className="db-topbar-right">
              <input className="db-search" placeholder={`${ICONS.search} Search...`} />
              <div className="db-notif">{ICONS.notifications}<span className="db-notif-dot"></span></div>
            </div>
          </div>

          <div className="db-stats">
            {data.stats.map((stat) => (
              <div key={stat.label} className="db-stat" style={{ borderColor: stat.border }}>
                <div className="db-stat-icon">{getStatIcon(stat.label)}</div>
                <div className="db-stat-val" style={{ color: stat.color }}>{stat.val}</div>
                <div className="db-stat-label">{stat.label}</div>
                <div className={`db-stat-change ${stat.up ? "up" : "down"}`}>{stat.change}</div>
              </div>
            ))}
          </div>

          <div className="db-grid-2">
            <div className="db-card">
              <div className="db-card-header">
                <div className="db-card-title">{ICONS.applications} Job Applications</div>
                <button className="db-card-action">View all {ICONS.arrowRight}</button>
              </div>
              {data.applications.map((application) => (
                <div className="db-app-item" key={application.title}>
                  <div className="db-app-logo" style={{ background: application.bg, color: application.color }}>{application.logo}</div>
                  <div>
                    <div className="db-app-title">{application.title}</div>
                    <div className="db-app-company">{application.company}</div>
                  </div>
                  <span className={`db-app-status ${application.cls}`}>{application.status}</span>
                </div>
              ))}
            </div>

            <div className="db-card">
              <div className="db-card-header">
                <div className="db-card-title">{ICONS.courses} My Learning</div>
                <button className="db-card-action">View all {ICONS.arrowRight}</button>
              </div>
              {data.courses.map((course) => (
                <div className="db-course-item" key={course.title}>
                  <div className="db-course-thumb" style={{ background: course.bg }}>{getCourseIcon(course.title)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="db-course-title">{course.title}</div>
                    <div className="db-course-meta">{course.meta} · {course.pct}%</div>
                    <div className="db-progress-wrap">
                      <div className="db-progress-bar" style={{ width: `${course.pct}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="db-grid-3">
            <div className="db-card">
              <div className="db-card-header">
                <div className="db-card-title">{ICONS.sparkles} Recent Activity</div>
                <button className="db-card-action">View all {ICONS.arrowRight}</button>
              </div>
              {TIMELINE.map((item, index) => (
                <div className="db-timeline-item" key={index}>
                  <div className="db-timeline-icon" style={{ background: item.bg }}>{item.icon}</div>
                  <div className="db-timeline-text">{item.text}</div>
                  <div className="db-timeline-time">{item.time}</div>
                </div>
              ))}
            </div>

            <div className="db-card">
              <div className="db-card-header"><div className="db-card-title">{ICONS.progress} Skill Strength</div></div>
              <div className="db-skill-bars">
                {data.skills.map((skill) => (
                  <div className="db-skill-bar-item" key={skill.name}>
                    <div className="db-skill-name">{skill.name}</div>
                    <div className="db-skill-track">
                      <div className="db-skill-fill" style={{ width: `${skill.pct}%`, background: skill.color }}></div>
                    </div>
                    <div className="db-skill-pct">{skill.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="db-grid-2">
            <div className="db-card">
              <div className="db-card-header">
                <div className="db-card-title">{ICONS.saved} Saved Jobs</div>
                <button className="db-card-action">View all {ICONS.arrowRight}</button>
              </div>
              {data.savedJobs.map((job) => (
                <div className="db-saved-item" key={job.title}>
                  <div className="db-saved-logo" style={{ background: job.bg, color: job.color }}>{job.logo}</div>
                  <div>
                    <div className="db-saved-title">{job.title}</div>
                    <div className="db-saved-meta">{job.meta}</div>
                  </div>
                  <button className="db-apply-btn">Apply {ICONS.arrowRight}</button>
                </div>
              ))}
            </div>

            <div className="db-card">
              <div className="db-card-header"><div className="db-card-title">{ICONS.recommendation} AI Recommendations</div></div>
              {RECS.map((item) => (
                <div className="db-rec-item" key={item.title}>
                  <div className="db-rec-icon" style={{ background: item.bg }}>{item.icon}</div>
                  <div>
                    <div className="db-rec-title">{item.title}</div>
                    <div className="db-rec-sub">{item.sub}</div>
                  </div>
                  <span className="db-rec-arrow">{ICONS.arrowRight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
