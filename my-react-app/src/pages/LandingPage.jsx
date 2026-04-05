import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ICONS = {
  jobs: "\u{1F4BC}",
  courses: "\u{1F393}",
  gigs: "\u{1F9D1}\u200D\u{1F4BB}",
  vendors: "\u{1F3EA}",
  social: "\u{1F465}",
  ai: "\u2728",
  seeker: "\u{1F50D}",
  employer: "\u{1F3E2}",
  freelancer: "\u{1F680}",
  trainer: "\u{1F4DA}",
  vendor: "\u{1F6D2}",
  rocket: "\u{1F680}",
  wave: "\u{1F44B}",
  heart: "\u2665",
  comment: "\u{1F4AC}",
  share: "\u{1F517}",
  menu: "\u2630",
  arrowRight: "\u2192",
};

const modules = [
  { icon: ICONS.jobs, title: "Job Portal", desc: "Search, apply and hire for any role anywhere", color: "rgba(24,95,165,0.2)", cls: "card-jobs", path: "/jobs" },
  { icon: ICONS.courses, title: "Courses", desc: "Learn new skills and get industry certified", color: "rgba(29,158,117,0.2)", cls: "card-courses", path: "/courses" },
  { icon: ICONS.gigs, title: "Gigs", desc: "Post tasks and bid on freelance projects", color: "rgba(186,117,23,0.2)", cls: "card-gigs", path: "/gigs" },
  { icon: ICONS.vendors, title: "Vendors", desc: "Set up your store and sell services", color: "rgba(212,83,126,0.2)", cls: "card-vendors", path: "/vendors" },
  { icon: ICONS.social, title: "Social Feed", desc: "Post, connect and grow your network", color: "rgba(127,119,221,0.2)", cls: "card-social", path: "/community" },
  { icon: ICONS.ai, title: "AI Tools", desc: "Smart matches, resume builder and more", color: "rgba(29,158,117,0.2)", cls: "card-ai", path: "/ai-tools" },
];

const roles = [
  { icon: ICONS.seeker, title: "Job Seeker", desc: "Find your dream job faster" },
  { icon: ICONS.employer, title: "Employer", desc: "Hire the best talent" },
  { icon: ICONS.freelancer, title: "Freelancer", desc: "Get gigs and grow income" },
  { icon: ICONS.trainer, title: "Trainer", desc: "Teach and sell courses" },
  { icon: ICONS.vendor, title: "Vendor", desc: "Sell products and services" },
];

const jobs = [
  { abbr: "TCS", title: "React Developer", meta: "TCS · Pune · \u20B98-12 LPA", tag: "New", tagCls: "tag-blue", avCls: "av-blue" },
  { abbr: "INF", title: "UI/UX Designer", meta: "Infosys · Remote · \u20B96-9 LPA", tag: "Easy", tagCls: "tag-green", avCls: "av-green" },
  { abbr: "WPR", title: "Node.js Backend", meta: "Wipro · Mumbai · \u20B910-15 LPA", tag: "Hot", tagCls: "tag-blue", avCls: "av-purple" },
];

const posts = [
  { user: "Priya S. · Hiring Manager", text: "We are hiring Flutter developers in Pune. 3+ years experience. DM me directly.", likes: 24, comments: 8 },
  { user: "Amit K. · Freelancer", text: "Just completed my 50th project on ProSphere. Best platform ever.", likes: 61, comments: 12 },
];

const stats = [
  { num: 50, suffix: "K+", label: "Active Jobs" },
  { num: 12, suffix: "K+", label: "Courses" },
  { num: 80, suffix: "K+", label: "Professionals" },
  { num: 5, suffix: "K+", label: "Vendors" },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Counter({ num, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = num / 60;
          const timer = setInterval(() => {
            current += step;
            if (current >= num) {
              setCount(num);
              clearInterval(timer);
              return;
            }
            setCount(Math.floor(current));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [num]);

  return (
    <div ref={ref} className="ps-stat-num">
      {count}
      {suffix}
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [heroRef, heroVisible] = useReveal();
  const [modulesRef, modulesVisible] = useReveal();
  const [rolesRef, rolesVisible] = useReveal();
  const [dashRef, dashVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  const onAuthClick = () => navigate("/auth");

  return (
    <div className="ps-app">
      <div className="ps-bg">
        <div className="ps-bg-orb orb1"></div>
        <div className="ps-bg-orb orb2"></div>
        <div className="ps-bg-orb orb3"></div>
      </div>
      <div className="ps-grid"></div>

      <nav className="ps-nav">
        <div className="ps-logo">ProSphere</div>
        <div className={`ps-nav-links ${menuOpen ? "open" : ""}`}>
          {["Jobs", "Courses", "Gigs", "Vendors", "Community"].map((label) => (
            <a
              key={label}
              href="#"
              onClick={(event) => {
                event.preventDefault();
                setMenuOpen(false);
                navigate(`/${label.toLowerCase()}`);
              }}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="ps-nav-actions">
          <button className="ps-btn ps-btn-outline" onClick={onAuthClick}>
            <span>Sign in</span>
          </button>
          <button className="ps-btn ps-btn-primary" onClick={onAuthClick}>
            <span>Get started {ICONS.arrowRight}</span>
          </button>
        </div>
        <button className="ps-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {ICONS.menu}
        </button>
      </nav>

      <section ref={heroRef} className={`ps-hero ${heroVisible ? "visible" : ""}`}>
        <div className="ps-badge">
          <span className="ps-badge-dot"></span>
          All-in-One Professional Platform
        </div>
        <h1>
          Learn. Work. Grow.
          <br />
          <span className="grad">Together.</span>
        </h1>
        <p>Find jobs, hire talent, learn new skills, sell services, and grow your professional network all in one powerful place.</p>
        <div className="ps-hero-btns">
          <button className="ps-btn ps-btn-primary ps-btn-lg" onClick={() => navigate("/jobs")}>
            <span>Explore Jobs {ICONS.arrowRight}</span>
          </button>
          <button className="ps-btn ps-btn-outline ps-btn-lg" onClick={() => navigate("/courses")}>
            <span>Browse Courses</span>
          </button>
        </div>
        <div className="ps-hero-cards">
          {[
            [ICONS.jobs, "50K+ Jobs"],
            [ICONS.courses, "12K+ Courses"],
            [ICONS.gigs, "8K+ Gigs"],
            [ICONS.vendors, "5K+ Vendors"],
            [ICONS.social, "80K+ Professionals"],
          ].map(([icon, label]) => (
            <div className="ps-float-card" key={label}>
              <span className="ps-float-card-icon">{icon}</span> {label}
            </div>
          ))}
        </div>
      </section>

      <div className="ps-stats">
        {stats.map((item) => (
          <div className="ps-stat" key={item.label}>
            <Counter num={item.num} suffix={item.suffix} />
            <div className="ps-stat-label">{item.label}</div>
          </div>
        ))}
      </div>

      <section ref={modulesRef} className={`ps-section reveal ${modulesVisible ? "visible" : ""}`}>
        <div className="ps-section-title">
          Everything in <span className="grad">one platform</span>
        </div>
        <div className="ps-section-sub">15 powerful modules built for professionals</div>
        <div className="ps-modules">
          {modules.map((module, index) => (
            <div
              className={`ps-module-card ${module.cls}`}
              key={module.title}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(module.path)}
            >
              <div className="ps-module-icon" style={{ background: module.color }}>
                {module.icon}
              </div>
              <span className="ps-module-arrow">{ICONS.arrowRight}</span>
              <h3>{module.title}</h3>
              <p>{module.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={rolesRef} className={`ps-section ps-section-alt reveal ${rolesVisible ? "visible" : ""}`}>
        <div className="ps-section-title">
          Built for <span className="grad">every professional</span>
        </div>
        <div className="ps-section-sub">One platform, five powerful roles</div>
        <div className="ps-roles">
          {roles.map((role, index) => (
            <div className="ps-role" key={role.title} style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="ps-role-icon">{role.icon}</span>
              <h3>{role.title}</h3>
              <p>{role.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={dashRef} className={`ps-section reveal ${dashVisible ? "visible" : ""}`}>
        <div className="ps-section-title">
          Your <span className="grad">Dashboard</span>
        </div>
        <div className="ps-section-sub">Personalized ProSphere workspace</div>
        <div className="ps-dashboard">
          <div className="ps-dash-header">
            <span>
              Welcome back, Rahul {ICONS.wave}
            </span>
            <div className="ps-dash-tags">
              <span className="ps-tag tag-blue">3 new matches</span>
              <span className="ps-tag tag-green">2 messages</span>
            </div>
          </div>
          <div className="ps-dash-body">
            <div className="ps-dash-left">
              <div className="ps-dash-label">Recommended Jobs</div>
              {jobs.map((job) => (
                <div className="ps-job-item" key={job.title}>
                  <div className={`ps-job-avatar ${job.avCls}`}>{job.abbr}</div>
                  <div className="ps-job-info">
                    <div className="ps-job-title">{job.title}</div>
                    <div className="ps-job-meta">{job.meta}</div>
                  </div>
                  <span className={`ps-tag ${job.tagCls}`}>{job.tag}</span>
                </div>
              ))}
            </div>
            <div className="ps-dash-right">
              <div className="ps-dash-label">Community Feed</div>
              {posts.map((post) => (
                <div className="ps-post" key={post.user}>
                  <div className="ps-post-user">{post.user}</div>
                  <div className="ps-post-text">{post.text}</div>
                  <div className="ps-post-actions">
                    <span>
                      {ICONS.heart} {post.likes}
                    </span>
                    <span>
                      {ICONS.comment} {post.comments}
                    </span>
                    <span>
                      {ICONS.share} Share
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className={`ps-cta reveal ${ctaVisible ? "visible" : ""}`}>
        <div className="ps-cta-box">
          <h2>
            Ready to join <span className="grad">ProSphere?</span>
          </h2>
          <p>Join 80,000+ professionals already learning, working and growing together.</p>
          <div className="ps-cta-btns">
            <button className="ps-btn ps-btn-primary ps-btn-lg" onClick={onAuthClick}>
              <span>Get started free {ICONS.arrowRight}</span>
            </button>
            <button className="ps-btn ps-btn-outline ps-btn-lg">
              <span>Watch demo</span>
            </button>
          </div>
        </div>
      </section>

      <footer className="ps-footer">
        <div className="ps-footer-logo">ProSphere</div>
        <p>Learn. Work. Grow. Together.</p>
        <p style={{ marginTop: "6px", fontSize: "11px", opacity: 0.4 }}>© 2026 ProSphere. All rights reserved.</p>
      </footer>
    </div>
  );
}
