import express from "express";
import { punchIn, punchOut } from "../controllers/attendance.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middlewares.js";

const router = express.Router();

router.post("/punch-in", verifyToken, punchIn);
router.post("/punch-out", verifyToken, punchOut);

export default router;
