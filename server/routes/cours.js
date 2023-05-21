import express from "express";

import { getAllThemes, getCourById, updateCour, updateTheme} from "../controllers/cours.js";
import auth from "../middleware/auth.js";
const router = express.Router();
 
router.get('/:id',auth, getCourById)

router.patch('/:id',auth, updateCour)

router.put('/updateTheme',auth, updateTheme)
router.get('/all/themes',auth, getAllThemes)

export default router 