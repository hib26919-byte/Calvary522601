import React from "react";
import { useOutletContext } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AdminHome() {
  const { analyticsData, stats } = useOutletContext();
  const totalPageViews = analyticsData.reduce((s, d) => s + d.home + d.about + d.tribal + d.children + d.bibleDistribution + d.gallery + d.contact, 0);
  return (
    <div>
      <div className="admin-section-header"><h2>Dashboard</h2><p>Overview of site content and visitor activity.</p></div>
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card" style={{ "--kpi-color": "#4B168C" }}><div className="admin-kpi-card__value">{totalPageViews}</div><div className="admin-kpi-card__label">Page Views</div></div>
        <div className="admin-kpi-card" style={{ "--kpi-color": "#8B5CF6" }}><div className="admin-kpi-card__value">{stats.gallery}</div><div className="admin-kpi-card__label">Gallery Images</div></div>
        <div className="admin-kpi-card" style={{ "--kpi-color": "#B83280" }}><div className="admin-kpi-card__value">{stats.bibleDistribution}</div><div className="admin-kpi-card__label">Bible Entries</div></div>
        <div className="admin-kpi-card" style={{ "--kpi-color": "#2FB7B2" }}><div className="admin-kpi-card__value">{analyticsData.reduce((s, d) => s + d.chatbot, 0)}</div><div className="admin-kpi-card__label">Chatbot Queries</div></div>
      </div>
      <div className="admin-chart-card admin-chart-card--wide"><h3>Visitors Trend</h3><ResponsiveContainer width="100%" height={260}><AreaChart data={analyticsData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Area dataKey="visitors" stroke="#4B168C" fill="#EEE7F8" /></AreaChart></ResponsiveContainer></div>
    </div>
  );
}
