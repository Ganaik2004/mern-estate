import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createReview, deleteReview } from '../controllers/review.controller.js';
const router = express.Router();
router.post('/listings/:id/review',verifyToken,createReview);
router.delete('/listings/:id/delete/:reviewId',verifyToken,deleteReview);
export default router;