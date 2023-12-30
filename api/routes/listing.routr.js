import express from 'express';
import { createListing,deleteListing,updateListing ,getLisitng,getLisitngs} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();
router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updateListing);
router.get('/get/:id',getLisitng);
router.get('/get',getLisitngs)
 export default router;