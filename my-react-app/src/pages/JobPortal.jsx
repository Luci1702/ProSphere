import { useState } from "react";
import "./JobPortal.css";

const ICONS = {
  bell: "\u{1F514}",
  search: "\u{1F50D}",
  location: "\u{1F4CD}",
  bookmark: "\u{1F516}",
  tag: "\u{1F3F7}",
  salary: "\u{1F4B0}",
  time: "\u23F0",
  duration: "\u23F3",
  arrowRight: "\u2192",
};

const ALL_JOBS = [
  { id: 1, logo: "TCS", logoBg: "rgba(24,95,165,0.2)", logoColor: "#4A9FE0", title: "Senior React Developer", company: "Tata Consultancy Services", badges: ["Featured", "Remote"], tags: ["React.js", "TypeScript", "Node.js", "REST API"], location: "Mumbai / Remote", salary: "\u20B912-18 LPA", exp: "3-5 yrs", posted: "2h ago", type: "Full Time" },
  { id: 2, logo: "INF", logoBg: "rgba(29,158,117,0.2)", logoColor: "#1D9E75", title: "UI/UX Designer", company: "Infosys", badges: ["New"], tags: ["Figma", "Adobe XD", "Prototyping", "CSS"], location: "Bangalore", salary: "\u20B98-12 LPA", exp: "2-4 yrs", posted: "5h ago", type: "Full Time" },
  { id: 3, logo: "WPR", logoBg: "rgba(127,119,221,0.2)", logoColor: "#9F99E8", title: "Full Stack Developer", company: "Wipro", badges: ["Hot", "Hybrid"], tags: ["React", "Spring Boot", "MySQL", "AWS"], location: "Pune / Hybrid", salary: "\u20B915-22 LPA", exp: "4-6 yrs", posted: "1d ago", type: "Full Time" },
  { id: 4, logo: "GOG", logoBg: "rgba(212,83,126,0.2)", logoColor: "#D4537E", title: "Android Developer", company: "Google India", badges: ["Featured", "Remote"], tags: ["Kotlin", "Android", "Jetpack", "Firebase"], location: "Remote", salary: "\u20B920-30 LPA", exp: "3-6 yrs", posted: "3h ago", type: "Full Time" },
  { id: 5, logo: "AZ", logoBg: "rgba(186,117,23,0.2)", logoColor: "#EF9F27", title: "DevOps Engineer", company: "Amazon Web Services", badges: ["New", "Remote"], tags: ["AWS", "Docker", "Kubernetes", "CI/CD"], location: "Hyderabad / Remote", salary: "\u20B918-28 LPA", exp: "4-7 yrs", posted: "6h ago", type: "Full Time" },
  { id: 6, logo: "ZOM", logoBg: "rgba(29,158,117,0.2)", logoColor: "#1D9E75", title: "Backend Engineer", company: "Zomato", badges: ["Hot"], tags: ["Node.js", "MongoDB", "Redis", "Microservices"], location: "Gurgaon", salary: "\u20B914-20 LPA", exp: "2-5 yrs", posted: "2d ago", type: "Full Time" },
  { id: 7, logo: "SWG", logoBg: "rgba(24,95,165,0.2)", logoColor: "#4A9FE0", title: "React Native Developer", company: "Swiggy", badges: ["New", "Hybrid"], tags: ["React Native", "JavaScript", "Redux", "Firebase"], location: "Bangalore / Hybrid", salary: "\u20B910-16 LPA", exp: "2-4 yrs", posted: "1d ago", type: "Full Time" },
  { id: 8, logo: "PAY", logoBg: "rgba(74,159,224,0.15)", logoColor: "#4A9FE0", title: "Java Spring Boot Developer", company: "Paytm", badges: ["Featured"], tags: ["Java", "Spring Boot", "Hibernate", "MySQL"], location: "Noida", salary: "\u20B912-20 LPA", exp: "3-6 yrs", posted: "4h ago", type: "Full Time" },
];

const BADGE_CLASS = { Featured: "badge-featured", New: "badge-new", Hot: "badge-hot", Remote: "badge-remote", Hybrid: "badge-remote" };

const FILTERS = {
  jobType: ["Full Time", "Part Time", "Internship", "Freelance", "Contract"],
  workMode: ["Remote", "On-site", "Hybrid"],
  experience: ["Fresher (0-1 yr)", "Junior (1-3 yrs)", "Mid (3-5 yrs)", "Senior (5+ yrs)"],
  skills: ["React.js", "Node.js", "Python", "Flutter", "Java / Spring", "UI/UX Design"],
};

const COUNTS = {
  "Full Time": "12,400", "Part Time": "3,200", "Internship": "5,100", "Freelance": "8,600", "Contract": "2,800",
  "Remote": "18,000", "On-site": "24,000", "Hybrid": "8,200",
  "Fresher (0-1 yr)": "6,400", "Junior (1-3 yrs)": "11,200", "Mid (3-5 yrs)": "9,800", "Senior (5+ yrs)": "7,600",
  "React.js": "4,200", "Node.js": "3,800", "Python": "5,100", "Flutter": "2,400", "Java / Spring": "3,600", "UI/UX Design": "2,900",
};

const CHIPS = ["All Jobs", "Remote", "Full Time", "Part Time", "Internship", "Freelance", "Fresher", "\u20B910L+"];

export default function JobPortal() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [activeChip, setActiveChip] = useState("All Jobs");
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [salary, setSalary] = useState(20);
  const [sort, setSort] = useState("Most Relevant");

  const toggleSave = (id) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = ALL_JOBS.filter((job) => {
    const query = search.toLowerCase();
    return !query || job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query) || job.tags.some((tag) => tag.toLowerCase().includes(query));
  });

  return (
    <div className="jp-wrapper">
      <div className="ps-bg"><div className="ps-bg-orb orb1"></div><div className="ps-bg-orb orb2"></div></div>
      <div className="ps-grid"></div>

      <nav className="jp-nav">
        <div className="ps-logo">ProSphere</div>
        <div className="jp-nav-links">
          <a href="#">Jobs</a><a href="#">Courses</a><a href="#">Gigs</a>
        </div>
        <div className="jp-nav-right">
          <div className="jp-notif">{ICONS.bell}<span className="notif-dot"></span></div>
          <div className="jp-avatar">RS</div>
        </div>
      </nav>

      <div className="jp-hero">
        <h1>Find your <span className="grad">dream job</span> today</h1>
        <p>50,000+ jobs from top companies - search, filter and apply in seconds</p>
        <div className="jp-search-bar">
          <span className="jp-search-icon">{ICONS.search}</span>
          <input className="jp-search-input" placeholder="Job title, skill or company..." value={search} onChange={(event) => setSearch(event.target.value)} />
          <div className="jp-search-divider"></div>
          <span className="jp-search-icon">{ICONS.location}</span>
          <input className="jp-search-input" placeholder="Location or Remote" value={location} onChange={(event) => setLocation(event.target.value)} style={{ maxWidth: "180px" }} />
          <button className="jp-search-btn">Search Jobs</button>
        </div>
        <div className="jp-chips">
          {CHIPS.map((chip) => (
            <div key={chip} className={`jp-chip ${activeChip === chip ? "active" : ""}`} onClick={() => setActiveChip(chip)}>{chip}</div>
          ))}
        </div>
      </div>

      <div className="jp-stats-bar">
        <span><strong>{filtered.length.toLocaleString()}</strong> jobs found</span>
        <span><strong>1,240</strong> added today</span>
        <span><strong>320</strong> companies hiring</span>
      </div>

      <div className="jp-main">
        <div className="jp-sidebar">
          <div className="jp-sidebar-header">
            <span>Filters</span>
            <button className="jp-filter-clear">Clear all</button>
          </div>
          {Object.entries(FILTERS).map(([key, options]) => (
            <div className="jp-filter-section" key={key}>
              <div className="jp-filter-title">{key.replace(/([A-Z])/g, " $1").trim()}</div>
              {options.map((option) => (
                <div className="jp-filter-option" key={option}>
                  <input type="checkbox" defaultChecked={["Full Time", "Remote", "Junior (1-3 yrs)", "React.js"].includes(option)} />
                  <span className="jp-filter-label">{option}</span>
                  <span className="jp-filter-count">{COUNTS[option]}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="jp-filter-section">
            <div className="jp-filter-title">Salary Range (LPA)</div>
            <div className="jp-salary-range">
              <input type="range" min="0" max="50" value={salary} onChange={(event) => setSalary(event.target.value)} />
              <div className="jp-salary-labels"><span>\u20B90</span><span>\u20B9{salary}L</span><span>\u20B950L+</span></div>
            </div>
          </div>
        </div>

        <div className="jp-listings">
          <div className="jp-listings-header">
            <div className="jp-listings-count"><strong>{filtered.length}</strong> jobs found</div>
            <select className="jp-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option>Most Relevant</option>
              <option>Newest First</option>
              <option>Highest Salary</option>
              <option>Most Applied</option>
            </select>
          </div>

          {filtered.map((job) => (
            <div key={job.id} className={`jp-job-card ${job.badges.includes("Featured") ? "featured" : ""}`}>
              <div className="jp-job-top">
                <div className="jp-company-logo" style={{ background: job.logoBg, color: job.logoColor }}>{job.logo}</div>
                <div className="jp-job-info">
                  <div className="jp-job-title-row">
                    <span className="jp-job-title">{job.title}</span>
                    {job.badges.map((badge) => <span key={badge} className={`jp-badge ${BADGE_CLASS[badge] || "badge-new"}`}>{badge}</span>)}
                  </div>
                  <div className="jp-company-name">{job.company}</div>
                </div>
                <button className={`jp-bookmark ${savedJobs.has(job.id) ? "saved" : ""}`} onClick={() => toggleSave(job.id)}>
                  {savedJobs.has(job.id) ? ICONS.bookmark : ICONS.tag}
                </button>
              </div>
              <div className="jp-job-tags">
                {job.tags.map((tag) => <span key={tag} className="jp-job-tag">{tag}</span>)}
              </div>
              <div className="jp-job-footer">
                <div className="jp-job-meta">
                  <span>{ICONS.location} {job.location}</span>
                  <span>{ICONS.salary} {job.salary}</span>
                  <span>{ICONS.duration} {job.exp}</span>
                  <span>{ICONS.time} {job.posted}</span>
                </div>
                <button className="jp-apply-btn">Apply Now {ICONS.arrowRight}</button>
              </div>
            </div>
          ))}

          <div className="jp-load-more">
            <button className="jp-load-btn">Load more jobs</button>
          </div>
        </div>
      </div>
    </div>
  );
}
