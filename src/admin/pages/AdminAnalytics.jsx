import React from "react";
import { useOutletContext } from "react-router-dom";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AdminAnalytics() {
  const { analyticsData, pieData, CHART_COLORS } = useOutletContext();
  const totalVisitors = analyticsData.reduce((s, d) => s + d.visitors, 0);
  const totalChatbot = analyticsData.reduce((s, d) => s + d.chatbot, 0);
  const totalPageViews = analyticsData.reduce((s, d) => s + d.home + d.about + d.tribal + d.children + d.gallery + d.contact, 0);
  const mostPopularPage = pieData.length ? pieData.reduce((a, b) => a.value > b.value ? a : b).name : "N/A";
  return (
    <div>
      <div className="admin-section-header"><h2>Analytics Dashboard</h2><p>Track website performance, page views, and chatbot usage.</p></div>
      <div className="admin-kpi-grid">
        <Kpi label="Total Visitors (30d)" value={totalVisitors} color="#4B168C" />
        <Kpi label="Total Page Views" value={totalPageViews} color="#8B5CF6" />
        <Kpi label="Chatbot Queries" value={totalChatbot} color="#B83280" />
        <Kpi label="Most Visited Page" value={mostPopularPage} color="#2FB7B2" />
      </div>
      <div className="admin-charts-grid">
        <div className="admin-chart-card admin-chart-card--wide"><h3>Visitors Over Time</h3><ResponsiveContainer width="100%" height={240}><AreaChart data={analyticsData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Area dataKey="visitors" stroke="#4B168C" fill="#EEE7F8" /></AreaChart></ResponsiveContainer></div>
        <div className="admin-chart-card admin-chart-card--wide"><h3>Page Views by Page</h3><ResponsiveContainer width="100%" height={260}><LineChart data={analyticsData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Legend />{["home", "about", "tribal", "children", "gallery", "contact"].map((page, i) => <Line key={page} type="monotone" dataKey={page} stroke={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2} dot={false} />)}</LineChart></ResponsiveContainer></div>
        <div className="admin-chart-card"><h3>Chatbot Queries</h3><ResponsiveContainer width="100%" height={240}><BarChart data={analyticsData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Bar dataKey="chatbot" fill="#8B5CF6" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div>
        <div className="admin-chart-card"><h3>Page Distribution</h3><ResponsiveContainer width="100%" height={240}><PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>{pieData.map((entry, i) => <Cell key={entry.name} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
      </div>
    </div>
  );
}

function Kpi({ label, value, color }) {
  return <div className="admin-kpi-card" style={{ "--kpi-color": color }}><div className="admin-kpi-card__value">{typeof value === "number" ? value.toLocaleString() : value}</div><div className="admin-kpi-card__label">{label}</div></div>;
}
