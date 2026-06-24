import express from "express";
import { getDb } from "../services/firebaseAdmin.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const snap = await getDb().collection("bibleDistribution").get();
    const entries = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    // Sort in-memory to handle missing sortOrder/order fields gracefully
    entries.sort((a, b) => {
      const orderA = a.sortOrder !== undefined ? a.sortOrder : (a.order !== undefined ? a.order : 50);
      const orderB = b.sortOrder !== undefined ? b.sortOrder : (b.order !== undefined ? b.order : 50);
      return Number(orderA) - Number(orderB);
    });
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      sortOrder: req.body.sortOrder !== undefined ? Number(req.body.sortOrder) : Date.now(),
      order: req.body.order !== undefined ? Number(req.body.order) : Date.now()
    };
    const ref = await getDb().collection("bibleDistribution").add(data);
    res.status(201).json({ id: ref.id });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      updatedAt: new Date()
    };
    if (data.sortOrder !== undefined) data.sortOrder = Number(data.sortOrder);
    if (data.order !== undefined) data.order = Number(data.order);
    
    await getDb().collection("bibleDistribution").doc(req.params.id).set(data, { merge: true });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    await getDb().collection("bibleDistribution").doc(req.params.id).delete();
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
