import express from "express";
import { getDb } from "../services/firebaseAdmin.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/knowledge", async (req, res, next) => {
  try {
    const snap = await getDb().collection("chatbotKnowledge").doc("knowledgeBase").get();
    res.json(snap.exists ? snap.data() : { entries: [] });
  } catch (err) {
    next(err);
  }
});

router.put("/knowledge", requireAdmin, async (req, res, next) => {
  try {
    await getDb().collection("chatbotKnowledge").doc("knowledgeBase").set({ ...req.body, lastUpdated: new Date() }, { merge: true });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
