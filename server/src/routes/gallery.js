import express from "express";
import { getDb } from "../services/firebaseAdmin.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const snap = await getDb().collection("gallery").orderBy("order", "asc").get();
    res.json(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const ref = await getDb().collection("gallery").add({ ...req.body, uploadedAt: new Date(), order: req.body.order || Date.now() });
    res.status(201).json({ id: ref.id });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    await getDb().collection("gallery").doc(req.params.id).delete();
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
