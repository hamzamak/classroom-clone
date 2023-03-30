import mongoose from "mongoose";
import Cour from "../models/cour.js";
import Room from "../models/room.js";

const baseUrl= "https://classroom-yepp.onrender.com" //"http://localhost:5000"
export const getAllThemes = async (req, res) => {
    try {
        let tabThemes =[]
        for (let i = 1; i <= 5;i++) {
            tabThemes.push({image:`${baseUrl}/uploads/themes/bg${i}.jpg`})
        }
        res.status(200).json({ tabThemes })
    } catch (error) {
        res.status(404).json({ "message": error })
    }

}

export const getCourById = async (req, res) => {
    const { id } = req.params;
    try {
        const cour = await Cour.findById(id)
        res.status(200).json({ cour })
    } catch (error) {
        res.status(404).json({ "message": error })
    }

}

export const updateCour = async (req, res) => {
    const { id } = req.params;
    //  const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No cour with id: ${id}`);
    const { titre, tags, isProfesseur, theme, description } = req.body;
    try {

        if (isProfesseur) {
            let cour = await Cour.findByIdAndUpdate(id, { titre, tags: tags, theme, description }, { new: true })

            res.status(200).json({ cour })
        }
        else {
            res.status(403).json({ "message": "vous avez pas droit de modifier un cour seulement les professeurs" })

        }



    } catch (error) {
        res.status(404).json({ error })
    }

}

export const updateTheme = async (req, res) => {
    const { theme, idRoom, idCour } = req.body;
    let tabThemes =[]
    for (let i = 1; i <= 5;i++) {
        tabThemes.push(`${baseUrl}/uploads/themes/bg${i}.jpg`)
    }
    try {
        if(tabThemes.includes(theme)){

            await Cour.findByIdAndUpdate(idCour, { theme })
            const updatedRoom = await Room.findById(idRoom).populate('cour').populate('professeur').populate('chapitres').populate('etudiants.etudiant').populate('etudiants.chapitresConsultees')
            res.status(200).json({ updatedRoom })
        }
        else  res.status(400).json({ message :"erreur theme not found" })


    } catch (error) {
        res.status(404).json({ error })
    }

}

