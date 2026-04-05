import { useState } from "react";
import "./Courses.css";

const ICONS = {
  all: "\u26A1",
  web: "\u{1F4BB}",
  mobile: "\u{1F4F1}",
  design: "\u{1F3A8}",
  data: "\u{1F4CA}",
  ai: "\u{1F916}",
  cloud: "\u2601",
  security: "\u{1F512}",
  business: "\u{1F4C8}",
  bell: "\u{1F514}",
  search: "\u{1F50D}",
  books: "\u{1F4DA}",
  fire: "\u{1F525}",
  heart: "\u2665",
  like: "\u{1F44D}",
  clock: "\u23F1",
  lessons: "\u{1F4D6}",
  trophy: "\u{1F3C6}",
  arrowRight: "\u2192",
  star: "\u2605",
};

const CATEGORIES = [`${ICONS.all} All`, `${ICONS.web} Web Dev`, `${ICONS.mobile} Mobile`, `${ICONS.design} Design`, `${ICONS.data} Data Science`, `${ICONS.ai} AI / ML`, `${ICONS.cloud} Cloud`, `${ICONS.security} Cybersecurity`, `${ICONS.business} Business`];

const ENROLLED = [
  { emoji: "\u269B", bg: "linear-gradient(135deg,#0f2a4a,#185FA5)", title: "Complete React.js Masterclass", instructor: "Rahul Mehra", progress: 65, lessons: "42/65 lessons" },
  { emoji: "\u{1F343}", bg: "linear-gradient(135deg,#0a2e1e,#1D9E75)", title: "Spring Boot with Hibernate", instructor: "Priya Singh", progress: 30, lessons: "18/60 lessons" },
  { emoji: "\u{1F40D}", bg: "linear-gradient(135deg,#1a1a2e,#7F77DD)", title: "Python for Data Science", instructor: "Amit Verma", progress: 80, lessons: "48/60 lessons" },
];

const COURSES = [
  { id: 1, emoji: "\u269B", bg: "linear-gradient(135deg,#0f2a4a,#185FA5)", category: "Web Dev", title: "Complete React.js & Next.js Bootcamp 2026", instructor: "Rahul Mehra", rating: 4.9, reviews: "12.4k", hours: "42h", lessons: "180", badge: "Bestseller", price: "\u20B9999", orig: "\u20B94,999" },
  { id: 2, emoji: "\u{1F343}", bg: "linear-gradient(135deg,#0a2e1e,#1D9E75)", category: "Backend", title: "Spring Boot + Hibernate + MySQL Full Course", instructor: "Priya Singh", rating: 4.8, reviews: "8.2k", hours: "35h", lessons: "140", badge: "Hot", price: "\u20B9799", orig: "\u20B93,999" },
  { id: 3, emoji: "\u{1F40D}", bg: "linear-gradient(135deg,#1a1a2e,#7F77DD)", category: "Data Science", title: "Python for Data Science & Machine Learning", instructor: "Amit Verma", rating: 4.9, reviews: "22.1k", hours: "55h", lessons: "220", badge: "Bestseller", price: "\u20B91,299", orig: "\u20B95,999" },
  { id: 4, emoji: "\u{1F4F1}", bg: "linear-gradient(135deg,#2e0f1a,#D4537E)", category: "Mobile", title: "Flutter & Dart - Complete App Development", instructor: "Sneha Patel", rating: 4.7, reviews: "6.8k", hours: "28h", lessons: "115", badge: "New", price: "\u20B9899", orig: "\u20B93,499" },
  { id: 5, emoji: "\u{1F3A8}", bg: "linear-gradient(135deg,#1a0f2e,#9F99E8)", category: "Design", title: "UI/UX Design Masterclass with Figma 2026", instructor: "Arjun Kapoor", rating: 4.8, reviews: "9.4k", hours: "24h", lessons: "96", badge: "Bestseller", price: "\u20B9749", orig: "\u20B92,999" },
  { id: 6, emoji: "\u2601", bg: "linear-gradient(135deg,#0a1a2e,#378ADD)", category: "Cloud", title: "AWS Solutions Architect - Zero to Hero", instructor: "Vikram Nair", rating: 4.9, reviews: "15.2k", hours: "48h", lessons: "200", badge: "Hot", price: "\u20B91,499", orig: "\u20B96,999" },
  { id: 7, emoji: "\u{1F916}", bg: "linear-gradient(135deg,#0a2e1e,#1D9E75)", category: "AI / ML", title: "Machine Learning & Deep Learning A-Z", instructor: "Dr. Kavya Sharma", rating: 4.9, reviews: "18.6k", hours: "60h", lessons: "240", badge: "Bestseller", price: "Free", orig: "" },
  { id: 8, emoji: "\u{1F512}", bg: "linear-gradient(135deg,#2e1a0a,#BA7517)", category: "Security", title: "Ethical Hacking & Cybersecurity Complete", instructor: "Rohan Das", rating: 4.7, reviews: "5.1k", hours: "32h", lessons: "130", badge: "New", price: "\u20B9999", orig: "\u20B94,499" },
];

const BADGE_CLASS = { Bestseller: "badge-bestseller", New: "badge-new", Hot: "badge-hot" };

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState(`${ICONS.all} All`);
  const [wishlist, setWishlist] = useState(new Set());
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Most Popular");

  const toggleWish = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = COURSES.filter((course) => {
    const query = search.toLowerCase();
    const matchesSearch = !query || course.title.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query) || course.category.toLowerCase().includes(query);
    const matchesCategory = activeCategory === `${ICONS.all} All` || course.category === activeCategory.replace(/^.+? /, "");
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="cp-wrapper">
      <div className="ps-bg"><div className="ps-bg-orb orb1"></div><div className="ps-bg-orb orb2"></div><div className="ps-bg-orb orb3"></div></div>
      <div className="ps-grid"></div>

      <nav className="cp-nav">
        <div className="ps-logo">ProSphere</div>
        <div className="cp-nav-links">
          <a href="#">Jobs</a>
          <a href="#" className="active">Courses</a>
          <a href="#">Gigs</a>
          <a href="#">Community</a>
        </div>
        <div className="cp-nav-right">
          <div className="cp-notif">{ICONS.bell}<span className="notif-dot"></span></div>
          <div className="cp-avatar">RS</div>
        </div>
      </nav>

      <div className="cp-hero">
        <h1>Learn new <span className="grad">skills today</span></h1>
        <p>12,000+ courses from expert trainers - learn at your own pace and get certified</p>
        <div className="cp-search-bar">
          <span className="cp-search-icon">{ICONS.search}</span>
          <input className="cp-search-input" placeholder="Search courses, skills or instructors..." value={search} onChange={(event) => setSearch(event.target.value)} />
          <button className="cp-search-btn">Search</button>
        </div>
        <div className="cp-cats">
          {CATEGORIES.map((category) => (
            <div key={category} className={`cp-cat ${activeCategory === category ? "active" : ""}`} onClick={() => setActiveCategory(category)}>{category}</div>
          ))}
        </div>
      </div>

      <div className="cp-stats">
        <span><strong>12,000+</strong> courses</span>
        <span><strong>800+</strong> instructors</span>
        <span><strong>2M+</strong> students enrolled</span>
        <span><strong>4.8{ICONS.star}</strong> avg rating</span>
      </div>

      <div className="cp-main">
        <div className="cp-sidebar">
          {[
            { title: "Level", opts: [["Beginner", "4,200"], ["Intermediate", "5,100"], ["Advanced", "2,700"]] },
            { title: "Price", opts: [["Free", "1,800"], ["Paid", "10,200"], ["Subscription", "600"]] },
            { title: "Duration", opts: [["0-2 Hours", "2,400"], ["2-10 Hours", "6,200"], ["10-20 Hours", "2,800"], ["20+ Hours", "600"]] },
            { title: "Language", opts: [["English", "8,400"], ["Hindi", "2,800"], ["Marathi", "800"]] },
            { title: "Features", opts: [["Certificate", "9,200"], ["Live Classes", "1,400"], ["Projects", "4,600"], ["Quizzes", "7,200"]] },
          ].map((section) => (
            <div className="cp-filter-section" key={section.title}>
              <div className="cp-filter-title">{section.title}</div>
              {section.opts.map(([label, count]) => (
                <div className="cp-filter-option" key={label}>
                  <input type="checkbox" defaultChecked={["Beginner", "Intermediate", "Free", "2-10 Hours", "English", "Certificate"].includes(label)} />
                  <span className="cp-filter-label">{label}</span>
                  <span className="cp-filter-count">{count}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="cp-content">
          <div className="cp-section-label">{ICONS.books} Continue Learning <span>{ENROLLED.length} courses in progress</span></div>
          <div className="cp-grid" style={{ marginBottom: "2rem" }}>
            {ENROLLED.map((course, index) => (
              <div className="cp-card" key={index}>
                <div className="cp-card-thumb" style={{ background: course.bg }}>{course.emoji}</div>
                <div className="cp-card-body">
                  <div className="cp-card-title">{course.title}</div>
                  <div className="cp-card-instructor">by {course.instructor}</div>
                  <div className="cp-progress-label">{course.progress}% complete · {course.lessons}</div>
                  <div className="cp-progress"><div className="cp-progress-bar" style={{ width: `${course.progress}%` }}></div></div>
                  <button className="cp-enroll-btn" style={{ width: "100%" }}>Continue {ICONS.arrowRight}</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cp-content-header">
            <div className="cp-content-count"><strong>{filtered.length}</strong> courses found</div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <select className="cp-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Highest Rated</option>
                <option>Price: Low to High</option>
              </select>
            </div>
          </div>
          <div className="cp-section-label">{ICONS.fire} Popular Courses</div>
          <div className="cp-grid">
            {filtered.map((course) => (
              <div className="cp-card" key={course.id}>
                <div className="cp-card-thumb" style={{ background: course.bg }}>
                  {course.emoji}
                  <div className="cp-card-badges">
                    <span className={`cp-card-badge ${BADGE_CLASS[course.badge] || "badge-new"}`}>{course.badge}</span>
                  </div>
                  <button className="cp-card-wishlist" onClick={() => toggleWish(course.id)}>
                    {wishlist.has(course.id) ? ICONS.heart : ICONS.like}
                  </button>
                </div>
                <div className="cp-card-body">
                  <div className="cp-card-category">{course.category}</div>
                  <div className="cp-card-title">{course.title}</div>
                  <div className="cp-card-instructor">by {course.instructor}</div>
                  <div className="cp-card-rating">
                    <span className="cp-card-stars">{ICONS.star.repeat(5)}</span>
                    <span className="cp-card-rating-num">{course.rating}</span>
                    <span className="cp-card-rating-count">({course.reviews})</span>
                  </div>
                  <div className="cp-card-meta">
                    <span>{ICONS.clock} {course.hours}</span>
                    <span>{ICONS.lessons} {course.lessons} lessons</span>
                    <span>{ICONS.trophy} Certificate</span>
                  </div>
                  <div className="cp-card-footer">
                    <div>
                      <span className={`cp-card-price ${course.price === "Free" ? "free" : ""}`}>{course.price}</span>
                      {course.orig && <span className="cp-card-price-orig">{course.orig}</span>}
                    </div>
                    <button className="cp-enroll-btn">{course.price === "Free" ? "Enroll Free" : "Enroll Now"}</button>
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
