import express from "express";
import { getDb } from "../services/firebaseAdmin.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAdmin, async (req, res, next) => {
  try {
    const snap = await getDb().collection("analytics").orderBy("date", "desc").limit(30).get();
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch (err) {
    next(err);
  }
});

export default router;
