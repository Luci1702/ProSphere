import { useState } from "react";
import "./AdminDashboard.css";

const ICONS = {
  dashboard: "\u{1F4CA}",
  users: "\u{1F465}",
  jobs: "\u{1F4BC}",
  courses: "\u{1F393}",
  gigs: "\u{1F9D1}\u200D\u{1F4BB}",
  vendors: "\u{1F3EA}",
  reports: "\u{1F6A8}",
  approvals: "\u2705",
  support: "\u{1F4AC}",
  revenue: "\u{1F4B0}",
  payouts: "\u{1F4B3}",
  invoices: "\u{1F9FE}",
  settings: "\u2699",
  lock: "\u{1F512}",
  person: "\u{1F464}",
  notice: "\u{1F4E2}",
  chart: "\u{1F4C8}",
  lightning: "\u26A1",
  bell: "\u{1F514}",
  wave: "\u{1F44B}",
  search: "\u{1F50D}",
  arrowUp: "\u2191",
  arrowRight: "\u2192",
};

const NAV_ITEMS = [
  { section: "Main", items: [
    { icon: ICONS.dashboard, label: "Dashboard", badge: null },
    { icon: ICONS.users, label: "Users", badge: "80K" },
    { icon: ICONS.jobs, label: "Jobs", badge: "50K" },
    { icon: ICONS.courses, label: "Courses", badge: "12K" },
    { icon: ICONS.gigs, label: "Gigs", badge: "8K" },
    { icon: ICONS.vendors, label: "Vendors", badge: null },
  ] },
  { section: "Moderation", items: [
    { icon: ICONS.reports, label: "Reports", badge: "12", badgeRed: true },
    { icon: ICONS.approvals, label: "Approvals", badge: "34", badgeRed: true },
    { icon: ICONS.support, label: "Support", badge: "7", badgeRed: true },
  ] },
  { section: "Finance", items: [
    { icon: ICONS.revenue, label: "Revenue", badge: null },
    { icon: ICONS.payouts, label: "Payouts", badge: null },
    { icon: ICONS.invoices, label: "Invoices", badge: null },
  ] },
  { section: "Settings", items: [
    { icon: ICONS.settings, label: "Settings", badge: null },
    { icon: ICONS.lock, label: "Roles & Access", badge: null },
  ] },
];

const STATS = [
  { icon: ICONS.users, val: "80,241", label: "Total Users", change: `${ICONS.arrowUp} 12.4% this month`, up: true, color: "#4A9FE0", border: "rgba(74,159,224,0.2)" },
  { icon: ICONS.jobs, val: "50,234", label: "Active Jobs", change: `${ICONS.arrowUp} 8.2% this month`, up: true, color: "#1D9E75", border: "rgba(29,158,117,0.2)" },
  { icon: ICONS.revenue, val: "\u20B924.6L", label: "Monthly Revenue", change: `${ICONS.arrowUp} 18.7% this month`, up: true, color: "#9F99E8", border: "rgba(127,119,221,0.2)" },
  { icon: ICONS.reports, val: "12", label: "Pending Reports", change: `${ICONS.arrowUp} 3 new today`, up: false, color: "#D4537E", border: "rgba(212,83,126,0.2)" },
];

const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
const REVENUES = [12, 18, 14, 22, 19, 28, 24];
const BAR_COLORS = ["#4A9FE0", "#1D9E75", "#9F99E8", "#4A9FE0", "#1D9E75", "#4A9FE0", "#1D9E75"];

const USERS = [
  { name: "Rahul Sharma", email: "rahul@gmail.com", av: "RS", avBg: "rgba(24,95,165,0.3)", avColor: "#4A9FE0", role: "Job Seeker", joined: "Today", status: "active" },
  { name: "Priya Singh", email: "priya@gmail.com", av: "PS", avBg: "rgba(29,158,117,0.3)", avColor: "#1D9E75", role: "Trainer", joined: "Yesterday", status: "active" },
  { name: "Amit Kumar", email: "amit@wipro.com", av: "AK", avBg: "rgba(127,119,221,0.3)", avColor: "#9F99E8", role: "Employer", joined: "2 days ago", status: "active" },
  { name: "Sneha Patel", email: "sneha@gmail.com", av: "SP", avBg: "rgba(212,83,126,0.3)", avColor: "#D4537E", role: "Freelancer", joined: "3 days ago", status: "pending" },
  { name: "Vikram Nair", email: "vikram@tcs.com", av: "VN", avBg: "rgba(186,117,23,0.3)", avColor: "#EF9F27", role: "Employer", joined: "5 days ago", status: "active" },
];

const ACTIVITIES = [
  { icon: ICONS.person, bg: "rgba(24,95,165,0.2)", text: <><strong>Rahul Sharma</strong> joined as Job Seeker</>, time: "2m ago" },
  { icon: ICONS.jobs, bg: "rgba(29,158,117,0.2)", text: <><strong>TCS</strong> posted a new job opening</>, time: "5m ago" },
  { icon: ICONS.reports, bg: "rgba(212,83,126,0.2)", text: <><strong>Report</strong> flagged on gig #4821</>, time: "12m ago" },
  { icon: ICONS.courses, bg: "rgba(127,119,221,0.2)", text: <><strong>Priya Singh</strong> uploaded new course</>, time: "20m ago" },
  { icon: ICONS.payouts, bg: "rgba(186,117,23,0.2)", text: <><strong>\u20B94,999</strong> payout to Amit Kumar</>, time: "35m ago" },
];

const QUICK_ACTIONS = [
  { icon: ICONS.approvals, label: "Approve Jobs" },
  { icon: ICONS.reports, label: "View Reports" },
  { icon: ICONS.notice, label: "Send Notice" },
  { icon: ICONS.payouts, label: "Process Payouts" },
];

const STATUS_CLASS = { active: "status-active", pending: "status-pending", banned: "status-banned" };
const maxRev = Math.max(...REVENUES);

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="ad-wrapper">
      <div className="ps-grid"></div>
      <div className="ad-layout">
        <div className="ad-sidebar">
          <div className="ad-logo">
            ProSphere<small>Admin Panel</small>
          </div>
          {NAV_ITEMS.map((section) => (
            <div key={section.section}>
              <div className="ad-nav-label">{section.section}</div>
              {section.items.map((item) => (
                <div key={item.label} className={`ad-nav-item ${activeNav === item.label ? "active" : ""}`} onClick={() => setActiveNav(item.label)}>
                  <span className="ad-nav-icon">{item.icon}</span>
                  {item.label}
                  {item.badge && <span className={`ad-nav-badge ${item.badgeRed ? "red" : ""}`}>{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}
          <div className="ad-sidebar-bottom">
            <div className="ad-admin-card">
              <div className="ad-admin-avatar">SA</div>
              <div>
                <div className="ad-admin-name">Super Admin</div>
                <div className="ad-admin-role">admin@prosphere.in</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ad-main">
          <div className="ad-topbar">
            <div className="ad-topbar-left">
              <h1>Welcome back, Admin {ICONS.wave}</h1>
              <p>Monday, 16 March 2026 - Here's what's happening today</p>
            </div>
            <div className="ad-topbar-right">
              <input className="ad-search" placeholder={`${ICONS.search} Search...`} />
              <div className="ad-notif">
                {ICONS.bell}
                <span className="ad-notif-dot"></span>
              </div>
            </div>
          </div>

          <div className="ad-stats">
            {STATS.map((stat) => (
              <div className="ad-stat-card" key={stat.label} style={{ borderColor: stat.border }}>
                <div className="ad-stat-icon">{stat.icon}</div>
                <div className="ad-stat-val" style={{ color: stat.color }}>{stat.val}</div>
                <div className="ad-stat-label">{stat.label}</div>
                <div className={`ad-stat-change ${stat.up ? "change-up" : "change-down"}`}>{stat.change}</div>
              </div>
            ))}
          </div>

          <div className="ad-grid-3">
            <div className="ad-card">
              <div className="ad-card-header">
                <div className="ad-card-title">{ICONS.chart} Revenue Overview</div>
                <select className="ad-select">
                  <option>Last 7 months</option>
                  <option>Last year</option>
                </select>
              </div>
              <div className="ad-chart">
                {REVENUES.map((value, index) => (
                  <div className="ad-bar-wrap" key={MONTHS[index]}>
                    <div className="ad-bar-val">\u20B9{value}L</div>
                    <div className="ad-bar" style={{ height: `${(value / maxRev) * 100}%`, background: BAR_COLORS[index], opacity: index === 5 ? 1 : 0.5 }}></div>
                    <div className="ad-bar-label">{MONTHS[index]}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "8px" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                  Total: <strong style={{ color: "#4A9FE0" }}>\u20B91.42 Cr</strong>
                </span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                  Avg: <strong style={{ color: "#1D9E75" }}>\u20B920.3L/mo</strong>
                </span>
              </div>
            </div>

            <div className="ad-card">
              <div className="ad-card-header">
                <div className="ad-card-title">{ICONS.lightning} Live Activity</div>
                <button className="ad-card-action">View all</button>
              </div>
              {ACTIVITIES.map((activity, index) => (
                <div className="ad-activity-item" key={index}>
                  <div className="ad-activity-icon" style={{ background: activity.bg }}>{activity.icon}</div>
                  <div className="ad-activity-text">{activity.text}</div>
                  <div className="ad-activity-time">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ad-grid-3">
            <div className="ad-card">
              <div className="ad-card-header">
                <div className="ad-card-title">{ICONS.users} Recent Users</div>
                <button className="ad-card-action">View all {ICONS.arrowRight}</button>
              </div>
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {USERS.map((user) => (
                    <tr key={user.name}>
                      <td>
                        <div className="ad-user-cell">
                          <div className="ad-user-av" style={{ background: user.avBg, color: user.avColor }}>{user.av}</div>
                          <div>
                            <div className="ad-user-name">{user.name}</div>
                            <div className="ad-user-email">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{user.role}</td>
                      <td style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{user.joined}</td>
                      <td><span className={`ad-status ${STATUS_CLASS[user.status]}`}>{user.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="ad-card">
                <div className="ad-card-header">
                  <div className="ad-card-title">{ICONS.person} User Roles</div>
                </div>
                <div className="ad-donut-wrap">
                  <div className="ad-donut">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#4A9FE0" strokeWidth="12" strokeDasharray="95 144" strokeLinecap="round" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#1D9E75" strokeWidth="12" strokeDasharray="50 144" strokeDashoffset="-95" strokeLinecap="round" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#9F99E8" strokeWidth="12" strokeDasharray="24 144" strokeDashoffset="-145" strokeLinecap="round" />
                    </svg>
                    <div className="ad-donut-label">
                      <div className="ad-donut-num">80K</div>
                      <div className="ad-donut-sub">Users</div>
                    </div>
                  </div>
                  <div className="ad-donut-legend">
                    {[["#4A9FE0", "Job Seekers", "42K"], ["#1D9E75", "Employers", "22K"], ["#9F99E8", "Freelancers", "11K"], ["#EF9F27", "Trainers", "5K"]].map(([color, label, value]) => (
                      <div className="ad-legend-item" key={label}>
                        <div className="ad-legend-dot" style={{ background: color }}></div>
                        <div className="ad-legend-label">{label}</div>
                        <div className="ad-legend-val">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ad-card">
                <div className="ad-card-header">
                  <div className="ad-card-title">{ICONS.lightning} Quick Actions</div>
                </div>
                <div className="ad-quick-actions">
                  {QUICK_ACTIONS.map((action) => (
                    <button className="ad-quick-btn" key={action.label}>
                      <div className="ad-quick-btn-icon">{action.icon}</div>
                      <div className="ad-quick-btn-label">{action.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
