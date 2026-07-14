import express from "express";
import {
  getHotels,
  getHotelBySlug,
  createHotel,
  updateHotel,
  deleteHotel,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/hotelController.js";
import { protectAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getHotels);
router.get("/:slug", getHotelBySlug);
router.post("/", protectAdmin, createHotel);
router.put("/:id", protectAdmin, updateHotel);
router.delete("/:id", protectAdmin, deleteHotel);

router.post("/rooms/create", protectAdmin, createRoom);
router.put("/rooms/:id", protectAdmin, updateRoom);
router.delete("/rooms/:id", protectAdmin, deleteRoom);

export default router;
