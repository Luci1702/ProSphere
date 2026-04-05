import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Auth.css";

const ICONS = {
  jobs: "\u{1F4BC}",
  courses: "\u{1F393}",
  ai: "\u2728",
  gigs: "\u{1F9D1}\u200D\u{1F4BB}",
  seeker: "\u{1F50D}",
  employer: "\u{1F3E2}",
  freelancer: "\u{1F680}",
  trainer: "\u{1F4DA}",
  vendor: "\u{1F6D2}",
  other: "\u{1F4A1}",
  wave: "\u{1F44B}",
  sparkle: "\u2728",
  eye: "\u{1F441}",
  eyeOff: "\u{1F648}",
  google: "G",
  linkedin: "in",
  arrowRight: "\u2192",
  star: "\u2605",
};

const features = [
  { icon: ICONS.jobs, bg: "rgba(24,95,165,0.2)", title: "50,000+ Job Openings", desc: "From top companies across India and worldwide" },
  { icon: ICONS.courses, bg: "rgba(29,158,117,0.2)", title: "12,000+ Courses", desc: "Learn in-demand skills with certified trainers" },
  { icon: ICONS.ai, bg: "rgba(127,119,221,0.2)", title: "AI-Powered Matching", desc: "Smart job and course recommendations just for you" },
  { icon: ICONS.gigs, bg: "rgba(212,83,126,0.2)", title: "8,000+ Gigs and Projects", desc: "Freelance work available right now" },
];

const roles = [
  { icon: ICONS.seeker, label: "Job Seeker" },
  { icon: ICONS.employer, label: "Employer" },
  { icon: ICONS.freelancer, label: "Freelancer" },
  { icon: ICONS.trainer, label: "Trainer" },
  { icon: ICONS.vendor, label: "Vendor" },
  { icon: ICONS.other, label: "Other" },
];

export default function Auth() {
  const [tab, setTab] = useState("login");
  const [showPass, setShowPass] = useState(false);
  const [showPassSignup, setShowPassSignup] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Job Seeker");
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "" });

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        username: loginData.email,
        password: loginData.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/auth/register", {
        ...signupData,
        phoneNumber: signupData.phone,
        roles: [selectedRole.toUpperCase().replace(" ", "_")],
      });
      alert("Registration successful! Please login.");
      setTab("login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="ps-bg">
        <div className="ps-bg-orb orb1"></div>
        <div className="ps-bg-orb orb2"></div>
        <div className="ps-bg-orb orb3"></div>
      </div>
      <div className="ps-grid"></div>

      <nav className="auth-nav">
        <div className="ps-logo">ProSphere</div>
        <div className="auth-nav-right">
          {tab === "login" ? (
            <>
              Don't have an account? <a onClick={() => setTab("signup")}>Sign up free</a>
            </>
          ) : (
            <>
              Already have an account? <a onClick={() => setTab("login")}>Sign in</a>
            </>
          )}
        </div>
      </nav>

      <div className="auth-main">
        <div className="auth-left">
          <div className="auth-left-title">
            Your professional
            <br />
            world starts <span className="grad">here.</span>
          </div>
          <div className="auth-left-sub">Join 80,000+ professionals using ProSphere to find jobs, learn skills, and grow their careers.</div>
          {features.map((feature) => (
            <div className="auth-feature" key={feature.title}>
              <div className="auth-feature-icon" style={{ background: feature.bg }}>
                {feature.icon}
              </div>
              <div className="auth-feature-text">
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
          <div className="auth-stats">
            <div>
              <div className="auth-stat-num">80K+</div>
              <div className="auth-stat-label">Professionals</div>
            </div>
            <div>
              <div className="auth-stat-num">50K+</div>
              <div className="auth-stat-label">Active Jobs</div>
            </div>
            <div>
              <div className="auth-stat-num">4.9{ICONS.star}</div>
              <div className="auth-stat-label">Avg Rating</div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-tabs">
            <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>
              Sign In
            </button>
            <button className={`auth-tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>
              Create Account
            </button>
          </div>

          {tab === "login" && (
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <h2>Welcome back {ICONS.wave}</h2>
              <p>Sign in to your ProSphere account</p>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" placeholder="you@example.com" value={loginData.email} onChange={(event) => setLoginData({ ...loginData, email: event.target.value })} required />
              </div>
              <div className="form-group pass-group">
                <label>Password</label>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(event) => setLoginData({ ...loginData, password: event.target.value })}
                  required
                />
                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? ICONS.eyeOff : ICONS.eye}
                </button>
              </div>
              <div className="form-forgot">
                <a href="#">Forgot password?</a>
              </div>
              <button type="submit" className="btn-submit">
                <span>Sign in to ProSphere {ICONS.arrowRight}</span>
              </button>
              <div className="auth-divider">
                <span>or continue with</span>
              </div>
              <div className="social-btns">
                <button type="button" className="social-btn">
                  {ICONS.google} Google
                </button>
                <button type="button" className="social-btn">
                  {ICONS.linkedin} LinkedIn
                </button>
              </div>
              <div className="form-terms">
                By signing in you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
              </div>
            </form>
          )}

          {tab === "signup" && (
            <form className="auth-form" onSubmit={handleSignupSubmit}>
              <h2>Join ProSphere {ICONS.sparkle}</h2>
              <p>Create your free account in seconds</p>
              <div className="form-row">
                <div className="form-group">
                  <label>First name</label>
                  <input type="text" placeholder="Rahul" value={signupData.firstName} onChange={(event) => setSignupData({ ...signupData, firstName: event.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input type="text" placeholder="Sharma" value={signupData.lastName} onChange={(event) => setSignupData({ ...signupData, lastName: event.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" placeholder="you@example.com" value={signupData.email} onChange={(event) => setSignupData({ ...signupData, email: event.target.value })} required />
              </div>
              <div className="form-group">
                <label>Phone number</label>
                <input type="tel" placeholder="+91 98765 43210" value={signupData.phone} onChange={(event) => setSignupData({ ...signupData, phone: event.target.value })} />
              </div>
              <div className="form-group pass-group">
                <label>Password</label>
                <input
                  type={showPassSignup ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={signupData.password}
                  onChange={(event) => setSignupData({ ...signupData, password: event.target.value })}
                  required
                />
                <button type="button" className="pass-toggle" onClick={() => setShowPassSignup(!showPassSignup)}>
                  {showPassSignup ? ICONS.eyeOff : ICONS.eye}
                </button>
              </div>
              <div className="form-group">
                <label>I am a...</label>
                <div className="form-role-grid">
                  {roles.map((role) => (
                    <button
                      type="button"
                      key={role.label}
                      className={`form-role-btn ${selectedRole === role.label ? "selected" : ""}`}
                      onClick={() => setSelectedRole(role.label)}
                    >
                      <span>{role.icon}</span>
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn-submit">
                <span>Create free account {ICONS.arrowRight}</span>
              </button>
              <div className="auth-divider">
                <span>or sign up with</span>
              </div>
              <div className="social-btns">
                <button type="button" className="social-btn">
                  {ICONS.google} Google
                </button>
                <button type="button" className="social-btn">
                  {ICONS.linkedin} LinkedIn
                </button>
              </div>
              <div className="form-terms">
                By signing up you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
