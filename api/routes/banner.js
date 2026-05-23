import express from "express";
import { getDb } from "../services/firebaseAdmin.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const snap = await getDb().collection("festivalBanners").get();
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const ref = await getDb().collection("festivalBanners").add({ ...req.body, createdAt: new Date() });
    res.status(201).json({ id: ref.id });
  } catch (err) {
    next(err);
  }
});

export default router;
