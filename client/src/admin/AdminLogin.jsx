import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    try {
      await login(email, password);
      if (remember) localStorage.setItem("calvary_admin_email", email);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    setError("");
    setNotice("");
    try {
      await resetPassword(email);
      setNotice("Password reset link sent to the admin email.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__visual">
        <div className="admin-login__cross">✚</div>
        <span>Secure ministry workspace</span>
        <h2>Manage stories, gallery, banners, messages, and ministry content with confidence.</h2>
        <p>Built for non-technical admins: edit, upload, publish, review, and follow up from one panel.</p>
      </div>

      <div className="admin-login__card">
        <img src="/logo.svg" alt="Calvary Prema" width="84" height="84" />
        <span className="admin-login__eyebrow">Calvary Prema Ministries</span>
        <h1>Admin Sign In</h1>
        <p>Enter your authorized ministry admin account.</p>

        {error && <div className="admin-login__error" role="alert">{error}</div>}
        {notice && <div className="admin-login__notice" role="status">{notice}</div>}

        <form onSubmit={handleSubmit} className="admin-login__form">
          <label>Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@calvaryprema.org" required autoComplete="email" disabled={loading} />
          </label>
          <label>Password
            <span className="admin-login__password">
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required autoComplete="current-password" disabled={loading} />
              <button type="button" onClick={() => setShowPassword((v) => !v)}>{showPassword ? "Hide" : "Show"}</button>
            </span>
          </label>
          <div className="admin-login__meta">
            <label><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember email</label>
            <button type="button" onClick={handleReset}>Forgot password?</button>
          </div>
          <button className="admin-login__submit" type="submit" disabled={loading}>{loading ? "Checking access..." : "Open Dashboard"}</button>
        </form>

        <div className="admin-login__features">
          <span>Protected routes</span>
          <span>Firebase auth</span>
          <span>Admin-only writes</span>
        </div>
      </div>
    </div>
  );
}
