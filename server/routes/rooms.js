import express from "express";

import { getRoomsByIdUser ,createRoom, RejoindreRoom, getRoomsById, getRoomsBySearch,addChapitre, noticeChapitreConsultee, deleteEtudiants, ask_new_codeRoom, addComments, getComments, deleteComment, deleteComments_ByIdChapitre } from "../controllers/rooms.js";

const router = express.Router();
router.get('/getRoom/:id', getRoomsById)
router.get('/:userId', getRoomsByIdUser)
router.post('/createRoom', createRoom)
router.post('/rejoindre', RejoindreRoom)

router.get('/getRooms/search', getRoomsBySearch)
router.post('/addChapitre', addChapitre)

router.post('/consulter', noticeChapitreConsultee)

router.post('/deleteEtudiants', deleteEtudiants)

router.patch('/askfor_new_codeRoom', ask_new_codeRoom)

//pour les commentaires du chapitre du room
router.post('/addComment', addComments)
router.get('/getComments/:id', getComments)
router.delete('/deleteComment/:id', deleteComment)

router.delete('/deleteComments/:id', deleteComments_ByIdChapitre)
export default router 