import express from "express";
import { mockCharge } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/mock-charge", mockCharge);

export default router;
