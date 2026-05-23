import admin, { getDb } from "../services/firebaseAdmin.js";

export async function requireAdmin(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Missing auth token" });
    const decoded = await admin.auth().verifyIdToken(token);
    const adminDoc = await getDb().collection("adminUsers").doc(decoded.uid).get();
    if (!adminDoc.exists) return res.status(403).json({ error: "Admin access required" });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid auth token" });
  }
}
