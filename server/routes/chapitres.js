import express from "express";

import { deleteChapitreById, getChapitreById, updateChapitre} from "../controllers/chapitres.js";
import auth from "../middleware/auth.js";

const router = express.Router();
 
router.get('/:id',auth, getChapitreById)

router.post('/delete',auth, deleteChapitreById );

router.patch('/update',auth, updateChapitre );

export default router 