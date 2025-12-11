import express from "express";
import { getTodayAttendance, punchIn, punchOut } from "../controllers/attendance.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middlewares.js";

const router = express.Router();

router.post("/punch-in", verifyToken, punchIn);
router.post("/punch-out", verifyToken, punchOut);
router.get("/today-attendance", verifyToken, getTodayAttendance)

export default router;
