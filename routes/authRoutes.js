import express from "express";
import { adminLogin, adminRegister } from "../controllers/authController.js";

const router = express.Router();

router.post("/admin/login", adminLogin);
router.post("/admin/register", adminRegister); 

export default router;
