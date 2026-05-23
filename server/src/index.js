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
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(corsMiddleware);
app.use("/api/", rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false }));
app.use(express.json({ limit: "10mb" }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "calvary-prema-api", timestamp: new Date().toISOString() });
});

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

app.listen(PORT, () => {
  console.log(`Calvary Prema API running on port ${PORT}`);
});

export default app;
