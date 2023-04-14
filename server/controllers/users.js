
import User from "../models/user.js"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


export const SignIn = async (req, res) => {
   const { email, password} = req.body;   // Recuperant email et mot de pass a partir du formulaire
   try {
      const existingUser = await User.findOne({ email })  //  On verifie s'il existe user avec cet email 

      //sinon l'utilisateur n'est pas trouve en envoyant un message d 'erreur 
      if (!existingUser) return res.status(404).json({ message: "User not found" });

     //  s'il existe  puisque le mot de pass venant de mongodb est crypte 
     // on doit utiliser la fonction compare de module bcrypt pour comparer les 2 mot de pass la fonction retourne true si
     // les mots de pass sont identiques
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

      // si N'est pas le cas ,  on envoye un message d'erreur 
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credential !" });

      // si  vrai on envoye les informations de utilisateur avec un token 
      const token = jwt.sign({
         result: existingUser
      },
         process.env.SECRET,
         {
            expiresIn: '1h'
         })
     
         res.status(200).json({ result: existingUser, token}); //the token is used just to logout the user when it  expire

   } catch (error) {
      res.status(500).json({ "message": error })
   }
}


export const SignUp = async (req, res) => {
   // Recuperant les informations d'inscription a partir du formulaire
   const { firstName, lastName, email, password, role } = req.body; 
   let isProfesseur = false
   if(role === "professeur")  isProfesseur= true
   else  isProfesseur= false 


   try {
      //  On verifie s'il existe user avec cet email
      const existingUser = await User.findOne({ email })
      // s'il existe vous ne pouvez pas utiliser cet email parce que c'est deja pris 
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      //sinon on prend le mot de passe on le decrypte
      const hashedPassword = await bcrypt.hash(password, 12)

      // et le stocke dans la base de données en creant un nouveau utilisateur 
      const result = await User.create(
         { email, password: hashedPassword, lastName: lastName , firstName: firstName , isProfesseur: isProfesseur  }
      )

      const token = jwt.sign({
         result :result
      },
      process.env.SECRET,
         {
            expiresIn: '1h'
         })
      res.status(200).json({ result, token}); 

   } catch (error) {
      res.status(500).json({ "message": error.message })
   }
}




