import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import corsMiddleware from "./middleware/cors.js";
import contentRoutes from "./routes/content.js";
import galleryRoutes from "./routes/gallery.js";
import bannerRoutes from "./routes/banner.js";
import chatbotRoutes from "./routes/chatbot.js";
import analyticsRoutes from "./routes/analytics.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false }));

function healthCheck(req, res) {
  res.json({ status: "ok", service: "calvary-prema-api", timestamp: new Date().toISOString() });
}

app.get("/health", healthCheck);
app.get("/api/health", healthCheck);

app.use("/api/content", contentRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
