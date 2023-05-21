
import User from "../models/user.js"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


export const SignIn = async (req, res) => {
   const { email, password} = req.body;
  
   try {
      const existingUser = await User.findOne({ email })
      if (!existingUser) return res.status(404).json({ message: "User not found" });
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credential !" });
      const token = jwt.sign({
         payload: existingUser
      },
         process.env.SECRET,
         {
            expiresIn: '4h'
         })
   
         res.status(200).json(token);

   } catch (error) {
      res.status(500).json({ "message": error })
   }
}


export const SignUp = async (req, res) => {
   const { firstName, lastName, email, password, role } = req.body;
   let isProfesseur = false
   if(role === "professeur")  isProfesseur= true
   else  isProfesseur= false 


   try {
      const existingUser = await User.findOne({ email })
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await User.create(
         { email, password: hashedPassword, lastName: lastName , firstName: firstName , isProfesseur: isProfesseur  }
      )
      const token = jwt.sign({
         payload :result
      },
      process.env.SECRET,
         {
            expiresIn: '4h'
         })
      res.status(200).json(  token );

   } catch (error) {
      res.status(500).json({ "message": error.message })
   }
}




