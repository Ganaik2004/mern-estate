import express from "express"
import { name, test } from "../controllers/user.controller.js";
const router = express.Router();
router.get('/test',test);
router.get('/name',name);
export default router;