import express from "express";
import { getDb } from "../services/firebaseAdmin.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const snap = await getDb().collection("siteContent").doc(req.params.id).get();
    res.json(snap.exists ? { id: snap.id, ...snap.data() } : null);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    await getDb().collection("siteContent").doc(req.params.id).set({ ...req.body, updatedAt: new Date() }, { merge: true });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
