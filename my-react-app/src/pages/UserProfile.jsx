import { useState } from "react";
import "./UserProfile.css";

const SKILLS = ["React.js","Spring Boot","MySQL","JavaScript","TypeScript","Node.js","Hibernate","REST APIs","Git","Docker","AWS","Figma","MongoDB","Redux"];
const FEATURED_SKILLS = ["React.js","Spring Boot","MySQL"];

const EXPERIENCE = [
  { logo:"TCS", logoBg:"rgba(24,95,165,0.2)", logoColor:"#4A9FE0", title:"Senior React Developer", company:"Tata Consultancy Services · Full Time · Pune", duration:"Jan 2023 — Present · 1 yr 3 months" },
  { logo:"INF", logoBg:"rgba(29,158,117,0.2)", logoColor:"#1D9E75", title:"Full Stack Developer", company:"Infosys · Full Time · Bangalore", duration:"Jun 2022 — Dec 2022 · 7 months" },
  { logo:"STR", logoBg:"rgba(127,119,221,0.2)", logoColor:"#9F99E8", title:"Frontend Developer Intern", company:"Startupify · Internship · Remote", duration:"Jan 2022 — May 2022 · 5 months" },
];

const PROJECTS = [
  { emoji:"⚛️", bg:"linear-gradient(135deg,#0f2a4a,#185FA5)", title:"ProSphere Platform", desc:"Full stack job & freelance platform", tags:["React","Spring Boot"] },
  { emoji:"🛒", bg:"linear-gradient(135deg,#0a2e1e,#1D9E75)", title:"E-Commerce App", desc:"Full featured shopping platform", tags:["React","Node.js"] },
  { emoji:"📊", bg:"linear-gradient(135deg,#1a0f2e,#9F99E8)", title:"Analytics Dashboard", desc:"Real-time data visualization tool", tags:["React","D3.js"] },
  { emoji:"💬", bg:"linear-gradient(135deg,#2e1a0a,#BA7517)", title:"Chat Application", desc:"Real-time messaging with WebSockets", tags:["Node.js","Socket.io"] },
];

const BADGES = [
  { icon:"⭐", label:"Top Rated" },
  { icon:"🚀", label:"Early Bird" },
  { icon:"🎓", label:"Learner" },
  { icon:"💼", label:"Job Ready" },
  { icon:"🔥", label:"10 Day Streak" },
];

const SIMILAR = [
  { av:"PS", avBg:"rgba(29,158,117,0.3)", avColor:"#1D9E75", name:"Priya Singh", role:"React Developer · Pune" },
  { av:"AK", avBg:"rgba(127,119,221,0.3)", avColor:"#9F99E8", name:"Amit Kumar", role:"Full Stack · Mumbai" },
  { av:"SP", avBg:"rgba(212,83,126,0.3)", avColor:"#D4537E", name:"Sneha Patel", role:"UI/UX Designer · Bangalore" },
];

const COMPLETION = [
  { label:"Profile photo added", done:true },
  { label:"Skills filled in", done:true },
  { label:"Experience added", done:true },
  { label:"Education added", done:true },
  { label:"Add resume PDF", done:false },
  { label:"Add portfolio link", done:false },
];

const STATS = [
  { num:"1.2K", label:"Connections" },
  { num:"48", label:"Posts" },
  { num:"12", label:"Projects" },
  { num:"4.9⭐", label:"Rating" },
  { num:"8", label:"Gigs Done" },
  { num:"3", label:"Courses" },
];

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("about");
  const [connected, setConnected] = useState(new Set());

  const toggleConnect = (name) => {
    setConnected(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="up-wrapper">
      <div className="ps-bg"><div className="ps-bg-orb orb1"></div><div className="ps-bg-orb orb2"></div></div>
      <div className="ps-grid"></div>

      {/* Navbar */}
      <nav className="up-nav">
        <div className="ps-logo">ProSphere</div>
        <div className="up-nav-links">
          <a href="#">Jobs</a><a href="#">Courses</a><a href="#">Gigs</a><a href="#">Community</a>
        </div>
        <div className="up-avatar-sm">RS</div>
      </nav>

      {/* Cover */}
      <div className="up-cover">
        <button className="up-cover-edit">✏️ Edit Cover</button>
      </div>

      {/* Profile Header */}
      <div className="up-profile-header">
        <div className="up-profile-top">
          <div>
            <div className="up-avatar-wrap">
              <div className="up-avatar">RS</div>
              <div className="up-avatar-online"></div>
            </div>
            <div className="up-profile-info">
              <h1>Rahul Sharma <span>@rahul_sharma</span></h1>
              <div className="up-profile-tagline">Full Stack Developer · React & Spring Boot · Open to Work 🟢</div>
              <div className="up-profile-meta">
                <span>📍 Pune, Maharashtra</span>
                <span>🎓 B.Tech CSE — VIT Pune</span>
                <span>💼 3 years experience</span>
                <span>🌐 rahulsharma.dev</span>
              </div>
            </div>
          </div>
          <div className="up-profile-actions">
            <button className="up-btn up-btn-primary">✉️ Message</button>
            <button className="up-btn up-btn-outline">+ Connect</button>
            <button className="up-btn up-btn-outline">⋯</button>
          </div>
        </div>
        <div className="up-stats-row">
          {STATS.map(s => (
            <div className="up-stat" key={s.label}>
              <div className="up-stat-num">{s.num}</div>
              <div className="up-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="up-main">
        <div className="up-left">
          {/* Tabs */}
          <div className="up-tabs">
            {["about","experience","projects","activity"].map(tab => (
              <button key={tab} className={`up-tab ${activeTab===tab?"active":""}`}
                onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase()+tab.slice(1)}
              </button>
            ))}
          </div>

          {/* About */}
          {activeTab === "about" && <>
            <div className="up-card">
              <div className="up-card-header"><div className="up-card-title">👤 About</div><button className="up-edit-btn">Edit</button></div>
              <div className="up-about-text">Passionate Full Stack Developer with 3+ years of experience building scalable web applications using React.js, Spring Boot, and MySQL. I love turning ideas into real products and have worked with startups and enterprises alike. Currently open to exciting full-time opportunities and freelance projects.</div>
            </div>
            <div className="up-card">
              <div className="up-card-header"><div className="up-card-title">⚡ Skills</div><button className="up-edit-btn">Edit</button></div>
              <div className="up-skills">
                {SKILLS.map(skill => (
                  <span key={skill} className={`up-skill ${FEATURED_SKILLS.includes(skill)?"featured":""}`}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="up-card">
              <div className="up-card-header"><div className="up-card-title">🎓 Education</div><button className="up-edit-btn">Edit</button></div>
              <div className="up-exp-item">
                <div className="up-exp-logo" style={{background:"rgba(24,95,165,0.2)",color:"#4A9FE0"}}>VIT</div>
                <div className="up-exp-info">
                  <h4>B.Tech in Computer Science Engineering</h4>
                  <p>VIT Pune · Pune, Maharashtra</p>
                  <span>2018 — 2022 · CGPA: 8.6/10</span>
                </div>
              </div>
            </div>
            <div className="up-card">
              <div className="up-card-header"><div className="up-card-title">🏆 Certifications</div><button className="up-edit-btn">Edit</button></div>
              {[{logo:"AWS",bg:"rgba(186,117,23,0.2)",color:"#EF9F27",title:"AWS Certified Solutions Architect",sub:"Amazon Web Services · 2023"},
                {logo:"META",bg:"rgba(29,158,117,0.2)",color:"#1D9E75",title:"Meta React Developer Certificate",sub:"Meta · Coursera · 2022"}
              ].map(c => (
                <div className="up-exp-item" key={c.logo}>
                  <div className="up-exp-logo" style={{background:c.bg,color:c.color}}>{c.logo}</div>
                  <div className="up-exp-info"><h4>{c.title}</h4><p>{c.sub}</p></div>
                </div>
              ))}
            </div>
          </>}

          {/* Experience */}
          {activeTab === "experience" && (
            <div className="up-card">
              <div className="up-card-header"><div className="up-card-title">💼 Work Experience</div><button className="up-edit-btn">+ Add</button></div>
              {EXPERIENCE.map(e => (
                <div className="up-exp-item" key={e.title}>
                  <div className="up-exp-logo" style={{background:e.logoBg,color:e.logoColor}}>{e.logo}</div>
                  <div className="up-exp-info"><h4>{e.title}</h4><p>{e.company}</p><span>{e.duration}</span></div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {activeTab === "projects" && (
            <div className="up-card">
              <div className="up-card-header"><div className="up-card-title">🚀 Projects</div><button className="up-edit-btn">+ Add</button></div>
              <div className="up-project-grid">
                {PROJECTS.map(p => (
                  <div className="up-project" key={p.title}>
                    <div className="up-project-thumb" style={{background:p.bg}}>{p.emoji}</div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                    <div className="up-project-tags">
                      {p.tags.map(t => <span className="up-project-tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity */}
          {activeTab === "activity" && (
            <div className="up-card">
              <div className="up-card-header"><div className="up-card-title">📰 Recent Activity</div></div>
              {[
                { time:"2 hours ago", text:<>Just completed the <strong style={{color:"#4A9FE0"}}>AWS Solutions Architect</strong> certification! 🎉</> },
                { time:"Yesterday", text:<>Applied to <strong style={{color:"#1D9E75"}}>Senior React Developer</strong> at Google India</> },
                { time:"3 days ago", text:<>Completed gig: <strong style={{color:"#EF9F27"}}>React Dashboard</strong> for a client ⭐⭐⭐⭐⭐</> },
              ].map((a,i) => (
                <div key={i} style={{padding:"8px 0",borderBottom: i<2?"0.5px solid rgba(255,255,255,0.06)":"none"}}>
                  <div style={{fontSize:"12px",color:"rgba(255,255,255,0.35)",marginBottom:"6px"}}>{a.time}</div>
                  <div style={{fontSize:"14px",color:"rgba(255,255,255,0.7)"}}>{a.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="up-right">
          {/* Profile completion */}
          <div className="up-sidebar-card">
            <div className="up-sidebar-title">📊 Profile Strength</div>
            <div className="up-completion">
              <div className="up-completion-header">
                <span className="up-completion-label">Completion</span>
                <span className="up-completion-pct">85%</span>
              </div>
              <div className="up-progress-bar-bg"><div className="up-progress-bar" style={{width:"85%"}}></div></div>
            </div>
            <div style={{marginTop:"12px"}}>
              {COMPLETION.map(c => (
                <div key={c.label} className={`up-completion-item ${c.done?"done":""}`}>
                  <div className={`up-check ${c.done?"check-done":"check-pending"}`}>{c.done?"✓":""}</div>
                  {c.label}
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="up-sidebar-card">
            <div className="up-sidebar-title">🏆 Badges Earned</div>
            <div className="up-badges">
              {BADGES.map(b => (
                <div className="up-badge-item" key={b.label}>
                  <div className="up-badge-icon">{b.icon}</div>
                  <div className="up-badge-label">{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar profiles */}
          <div className="up-sidebar-card">
            <div className="up-sidebar-title">👥 People You May Know</div>
            <div className="up-similar">
              {SIMILAR.map(s => (
                <div className="up-similar-item" key={s.name}>
                  <div className="up-similar-av" style={{background:s.avBg,color:s.avColor}}>{s.av}</div>
                  <div><div className="up-similar-name">{s.name}</div><div className="up-similar-role">{s.role}</div></div>
                  <button className={`up-follow-btn ${connected.has(s.name)?"connected":""}`}
                    onClick={() => toggleConnect(s.name)}>
                    {connected.has(s.name) ? "✓ Connected" : "+ Connect"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}