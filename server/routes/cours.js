import express from "express";

import { getAllThemes, getCourById, updateCour, updateTheme} from "../controllers/cours.js";

const router = express.Router();
 
router.get('/:id', getCourById)

router.patch('/:id', updateCour)

router.put('/updateTheme', updateTheme)
router.get('/all/themes', getAllThemes)

export default router 