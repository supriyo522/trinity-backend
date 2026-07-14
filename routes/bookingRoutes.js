import express from "express";
import {
  getQuote,
  createBooking,
  getBookingById,
  getBookingByRef,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/quote", getQuote);
router.post("/", createBooking);
router.get("/:id", getBookingById);
router.get("/ref/:bookingRef", getBookingByRef);

export default router;
