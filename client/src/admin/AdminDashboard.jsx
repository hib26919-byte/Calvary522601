import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getCountFromServer, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import "./AdminDashboard.css";

const SIDEBAR_LINKS = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "▦" },
  { path: "/admin/pages", label: "Page Content", icon: "✎" },
  { path: "/admin/gallery", label: "Gallery", icon: "▧" },
  { path: "/admin/banner", label: "Festival Banners", icon: "★" },
  { path: "/admin/chatbot", label: "Chatbot Training", icon: "◌" },
  { path: "/admin/messages", label: "Messages", icon: "✉" },
  { path: "/admin/analytics", label: "Analytics", icon: "↗" },
  { path: "/admin/settings", label: "Settings", icon: "⚙" }
];
const CHART_COLORS = ["#4B168C", "#8B5CF6", "#B83280", "#2FB7B2", "#A78BFA", "#38BDF8"];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [stats, setStats] = useState({ gallery: 0, banners: 0 });
  const [notifications, setNotifications] = useState({ messages: 0 });
  const [notificationItems, setNotificationItems] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, adminData, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { fetchAnalytics(); fetchStats(); fetchNotifications(); }, []);

  async function fetchAnalytics() {
    try {
      const q = query(collection(db, "analytics"), orderBy("date", "desc"), limit(30));
      const snap = await getDocs(q);
      setAnalyticsData(snap.docs.map((d) => {
        const value = d.data();
        return {
          date: d.id,
          home: value.pageViews?.home || 0,
          about: value.pageViews?.about || 0,
          tribal: value.pageViews?.tribal || 0,
          children: value.pageViews?.children || 0,
          gallery: value.pageViews?.gallery || 0,
          contact: value.pageViews?.contact || 0,
          chatbot: value.chatbotQueries || 0,
          visitors: value.uniqueVisitors || 0
        };
      }).reverse());
    } catch (err) {
      console.error("Analytics fetch error:", err);
    }
  }

  async function fetchStats() {
    try {
      const [gallerySnap, bannerSnap] = await Promise.all([getDocs(collection(db, "gallery")), getDocs(collection(db, "festivalBanners"))]);
      setStats({ gallery: gallerySnap.size, banners: bannerSnap.docs.filter((d) => d.data().isActive).length });
    } catch {}
  }

  async function fetchNotifications() {
    try {
      const unreadQuery = query(collection(db, "notifications"), where("read", "==", false));
      const unreadSnap = await getCountFromServer(unreadQuery);
      const listQuery = query(collection(db, "notifications"), orderBy("createdAt", "desc"), limit(8));
      const listSnap = await getDocs(listQuery);
      setNotifications({ messages: unreadSnap.data().count });
      setNotificationItems(listSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setNotifications({ messages: 0 });
      setNotificationItems([]);
    }
  }

  async function markNotificationRead(id) {
    await updateDoc(doc(db, "notifications", id), { read: true });
    fetchNotifications();
  }

  async function clearNotifications() {
    await Promise.all(notificationItems.map((item) => deleteDoc(doc(db, "notifications", item.id))));
    fetchNotifications();
  }

  const pieData = ["home", "about", "tribal", "children", "gallery", "contact"].map((name) => ({ name, value: analyticsData.reduce((s, d) => s + d[name], 0) }));

  async function handleLogout() {
    await logout();
    navigate("/admin/login");
  }

  return (
    <div className={`admin-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header"><img src="/logo.svg" alt="" />{sidebarOpen && <span>Admin Panel</span>}</div>
        <nav>{SIDEBAR_LINKS.map((link) => <NavLink key={link.path} to={link.path} end={link.path === "/admin/dashboard"}><span>{link.icon}</span>{sidebarOpen && link.label}</NavLink>)}</nav>
        <div className="admin-sidebar__footer">{sidebarOpen && <div><strong>{adminData?.name || user?.email}</strong><small>{adminData?.role || "Admin"}</small></div>}<button onClick={handleLogout}>{sidebarOpen ? "Logout" : "↩"}</button></div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <button onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle sidebar">☰</button>
          <strong>Calvary Prema Admin</strong>
          <div className="admin-notification-wrap">
            <button className="admin-notification" type="button" onClick={() => setNotifOpen((v) => !v)} aria-label="Open notifications">🔔 <span>{notifications.messages}</span></button>
            {notifOpen && <div className="admin-notification-menu">
              <div className="admin-notification-menu__head"><strong>Notifications</strong><button onClick={clearNotifications}>Clear all</button></div>
              {notificationItems.length === 0 ? <p>No notifications yet.</p> : notificationItems.map((item) => (
                <article key={item.id} className={item.read ? "read" : ""}>
                  <strong>{item.title}</strong>
                  <span>{item.message}</span>
                  <div><button onClick={() => markNotificationRead(item.id)}>Mark read</button><NavLink to="/admin/messages" onClick={() => setNotifOpen(false)}>Open</NavLink></div>
                </article>
              ))}
            </div>}
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer">View Site ↗</a>
        </header>
        <div className="admin-content"><Outlet context={{ analyticsData, stats, pieData, CHART_COLORS, refetch: fetchStats, refetchNotifications: fetchNotifications }} /></div>
      </main>
    </div>
  );
}
