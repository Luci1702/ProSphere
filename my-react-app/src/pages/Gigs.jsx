import { useState } from "react";
import "./Gigs.css";

const ICONS = {
  all: "\u26A1",
  web: "\u{1F4BB}",
  design: "\u{1F3A8}",
  mobile: "\u{1F4F1}",
  content: "\u270D",
  video: "\u{1F3AC}",
  data: "\u{1F4CA}",
  ai: "\u{1F916}",
  marketing: "\u{1F4C8}",
  bell: "\u{1F514}",
  search: "\u{1F50D}",
  clipboard: "\u{1F4CB}",
  gigs: "\u{1F4BC}",
  rocket: "\u{1F680}",
  star: "\u2605",
  heart: "\u2665",
  like: "\u{1F44D}",
  clock: "\u23F1",
  arrowRight: "\u2192",
};

const CATEGORIES = [`${ICONS.all} All`, `${ICONS.web} Web Dev`, `${ICONS.design} Design`, `${ICONS.mobile} Mobile`, `${ICONS.content} Content`, `${ICONS.video} Video`, `${ICONS.data} Data`, `${ICONS.ai} AI`, `${ICONS.marketing} Marketing`];

const GIGS = [
  { id: 1, emoji: "\u269B", bg: "linear-gradient(135deg,#0f2a4a,#185FA5)", badge: "Top Rated", badgeCls: "badge-top", title: "I will build a full React.js web app with REST API integration", name: "Rahul M.", avBg: "rgba(24,95,165,0.3)", avColor: "#4A9FE0", level: "Pro", tags: ["React", "Node.js", "REST API"], rating: 5.0, reviews: "284", price: "\u20B92,999", delivery: "3 days" },
  { id: 2, emoji: "\u{1F3A8}", bg: "linear-gradient(135deg,#1a0f2e,#9F99E8)", badge: "Featured", badgeCls: "badge-featured", title: "I will design a stunning UI/UX in Figma for your app or website", name: "Sneha P.", avBg: "rgba(127,119,221,0.3)", avColor: "#9F99E8", level: "Top Rated", tags: ["Figma", "UI/UX", "Prototyping"], rating: 4.9, reviews: "412", price: "\u20B91,999", delivery: "2 days" },
  { id: 3, emoji: "\u{1F4F1}", bg: "linear-gradient(135deg,#2e0f1a,#D4537E)", badge: "New", badgeCls: "badge-new", title: "I will develop a cross-platform Flutter mobile app for iOS & Android", name: "Amit K.", avBg: "rgba(212,83,126,0.3)", avColor: "#D4537E", level: "Rising", tags: ["Flutter", "Dart", "Firebase"], rating: 4.8, reviews: "96", price: "\u20B94,999", delivery: "7 days" },
  { id: 4, emoji: "\u{1F40D}", bg: "linear-gradient(135deg,#1a1a2e,#7F77DD)", badge: "Top Rated", badgeCls: "badge-top", title: "I will build machine learning models and data analysis pipelines", name: "Priya S.", avBg: "rgba(127,119,221,0.3)", avColor: "#7F77DD", level: "Pro", tags: ["Python", "ML", "Pandas"], rating: 5.0, reviews: "178", price: "\u20B93,499", delivery: "5 days" },
  { id: 5, emoji: "\u270D", bg: "linear-gradient(135deg,#0a2e1e,#1D9E75)", badge: "Featured", badgeCls: "badge-featured", title: "I will write SEO-optimized blog posts and technical content", name: "Vikram N.", avBg: "rgba(29,158,117,0.3)", avColor: "#1D9E75", level: "Pro", tags: ["Content", "SEO", "Blog"], rating: 4.9, reviews: "320", price: "\u20B9799", delivery: "1 day" },
  { id: 6, emoji: "\u{1F3AC}", bg: "linear-gradient(135deg,#2e1a0a,#BA7517)", badge: "New", badgeCls: "badge-new", title: "I will create professional product explainer videos with animation", name: "Arjun R.", avBg: "rgba(186,117,23,0.3)", avColor: "#EF9F27", level: "Rising", tags: ["Video", "Animation", "After Effects"], rating: 4.7, reviews: "64", price: "\u20B92,499", delivery: "4 days" },
];

export default function Gigs() {
  const [activeTab, setActiveTab] = useState("find");
  const [activeCategory, setActiveCategory] = useState(`${ICONS.all} All`);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(new Set());
  const [sort, setSort] = useState("Best Match");

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = GIGS.filter((gig) => {
    const query = search.toLowerCase();
    return !query || gig.title.toLowerCase().includes(query) || gig.tags.some((tag) => tag.toLowerCase().includes(query));
  });

  return (
    <div className="gp-wrapper">
      <div className="ps-bg"><div className="ps-bg-orb orb1"></div><div className="ps-bg-orb orb2"></div></div>
      <div className="ps-grid"></div>

      <nav className="gp-nav">
        <div className="ps-logo">ProSphere</div>
        <div className="gp-nav-links">
          <a href="#">Jobs</a><a href="#">Courses</a>
          <a href="#" className="active">Gigs</a><a href="#">Community</a>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div className="gp-notif">{ICONS.bell}<span className="notif-dot"></span></div>
          <div className="gp-avatar">RS</div>
        </div>
      </nav>

      <div className="gp-hero">
        <h1>Find & hire <span className="grad">top freelancers</span></h1>
        <p>8,000+ gigs from verified professionals - post tasks, bid and get work done fast</p>
        <div className="gp-tabs">
          {[["find", `${ICONS.search} Find Freelancers`], ["post", `${ICONS.clipboard} Post a Task`], ["my", `${ICONS.gigs} My Gigs`]].map(([key, label]) => (
            <button key={key} className={`gp-tab ${activeTab === key ? "active" : ""}`} onClick={() => setActiveTab(key)}>{label}</button>
          ))}
        </div>
        <div className="gp-search-bar">
          <span className="gp-search-icon">{ICONS.search}</span>
          <input className="gp-search-input" placeholder="Search gigs, skills or freelancers..." value={search} onChange={(event) => setSearch(event.target.value)} />
          <button className="gp-search-btn">Search</button>
        </div>
        <div className="gp-cats">
          {CATEGORIES.map((category) => (
            <div key={category} className={`gp-cat ${activeCategory === category ? "active" : ""}`} onClick={() => setActiveCategory(category)}>{category}</div>
          ))}
        </div>
      </div>

      <div className="gp-stats">
        <span><strong>8,000+</strong> gigs available</span>
        <span><strong>3,200+</strong> freelancers</span>
        <span><strong>95%</strong> satisfaction rate</span>
        <span><strong>24h</strong> avg delivery</span>
      </div>

      <div className="gp-main">
        <div className="gp-sidebar">
          {[
            { title: "Delivery Time", opts: [["Within 24 hours", "420"], ["Up to 3 days", "1,200"], ["Up to 7 days", "2,800"], ["Any time", "3,580"]] },
            { title: "Freelancer Level", opts: [["Top Rated", "480"], ["Pro", "1,200"], ["Rising Talent", "2,400"], ["New", "3,920"]] },
            { title: "Skills", opts: [["React.js", "980"], ["Figma / UI", "740"], ["Flutter", "560"], ["Node.js", "820"], ["Python", "640"], ["WordPress", "480"]] },
            { title: "Location", opts: [["India", "5,200"], ["Worldwide", "2,800"]] },
          ].map((section) => (
            <div className="gp-filter-section" key={section.title}>
              <div className="gp-filter-title">{section.title}</div>
              {section.opts.map(([label, count]) => (
                <div className="gp-filter-option" key={label}>
                  <input type="checkbox" defaultChecked={["Up to 3 days", "Pro", "React.js", "India"].includes(label)} />
                  <span className="gp-filter-label">{label}</span>
                  <span className="gp-filter-count">{count}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="gp-filter-section">
            <div className="gp-filter-title">Budget (\u20B9)</div>
            <div className="gp-budget-inputs">
              <input className="gp-budget-input" placeholder="Min" type="number" />
              <input className="gp-budget-input" placeholder="Max" type="number" />
            </div>
          </div>
        </div>

        <div className="gp-content">
          <div className="gp-post-task">
            <div>
              <h3>{ICONS.rocket} Need something done?</h3>
              <p>Post your task and get bids from top freelancers within minutes</p>
            </div>
            <button className="gp-post-btn">+ Post a Task</button>
          </div>

          <div className="gp-content-header">
            <div className="gp-content-count"><strong>{filtered.length}</strong> gigs found</div>
            <select className="gp-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option>Best Match</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Highest Rated</option>
              <option>Most Orders</option>
            </select>
          </div>

          <div className="gp-section-label">{ICONS.star} Top Rated Gigs <span>{filtered.length} results</span></div>
          <div className="gp-grid">
            {filtered.map((gig) => (
              <div className="gp-card" key={gig.id}>
                <div className="gp-card-thumb" style={{ background: gig.bg }}>
                  {gig.emoji}
                  <span className={`gp-card-badge ${gig.badgeCls}`}>{gig.badge}</span>
                  <button className="gp-card-save" onClick={() => toggleSave(gig.id)}>
                    {saved.has(gig.id) ? ICONS.heart : ICONS.like}
                  </button>
                </div>
                <div className="gp-card-body">
                  <div className="gp-freelancer">
                    <div className="gp-freelancer-avatar" style={{ background: gig.avBg, color: gig.avColor }}>
                      {gig.name.split(" ").map((name) => name[0]).join("")}
                    </div>
                    <span className="gp-freelancer-name">{gig.name}</span>
                    <span className="gp-freelancer-level">{gig.level}</span>
                  </div>
                  <div className="gp-card-title">{gig.title}</div>
                  <div className="gp-card-tags">
                    {gig.tags.map((tag) => <span className="gp-card-tag" key={tag}>{tag}</span>)}
                  </div>
                  <div className="gp-card-rating">
                    <span className="gp-card-stars">{ICONS.star.repeat(5)}</span>
                    <span className="gp-card-rating-num">{gig.rating}</span>
                    <span className="gp-card-rating-count">({gig.reviews} reviews)</span>
                  </div>
                  <div className="gp-card-footer">
                    <div className="gp-card-price">
                      <span className="gp-card-price-label">Starting at</span>
                      <span className="gp-card-price-val">{gig.price}</span>
                      <span className="gp-card-delivery">{ICONS.clock} {gig.delivery}</span>
                    </div>
                    <button className="gp-hire-btn">Hire Now {ICONS.arrowRight}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
