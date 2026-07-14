import express from "express";
import { protectAdmin } from "../middleware/auth.js";
import {
  getDashboardStats,
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
} from "../controllers/adminController.js";
import {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.use(protectAdmin);

router.get("/dashboard", getDashboardStats);

router.get("/bookings", getAllBookings);
router.put("/bookings/:id/status", updateBookingStatus);
router.delete("/bookings/:id", deleteBooking);

router.get("/customers", getAllCustomers);
router.get("/customers/:id", getCustomerById);
router.delete("/customers/:id", deleteCustomer);

export default router;
