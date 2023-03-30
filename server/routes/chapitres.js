import express from "express";

import { deleteChapitreById, getChapitreById, updateChapitre} from "../controllers/chapitres.js";

const router = express.Router();
 
router.get('/:id', getChapitreById)

router.post('/delete', deleteChapitreById );

router.patch('/update', updateChapitre );

export default router 