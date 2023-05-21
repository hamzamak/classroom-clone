import jwt from 'jsonwebtoken'

 const auth = async (req,res,next) => {

    try {
        const token = req.headers.authorization?.split(' ')[1] ;
        // now token est soit vient de googleAuth or from our server 
        // si token.length < 500 c est notre token que nous creons dans notre server else si > 500 c est du google

      //  const isCustomToken = token.length <500; 
        let decodeData ;
        // if(token && isCustomToken) {  // if token is our
            decodeData = jwt.verify(token, process.env.SECRET) ;
          //  console.log(decodeData)
            req.userId = decodeData?.payload?._id
      //   }
         // else{
         //    decodeData = jwt.decode(token) ; //token venant from google <cretentials>
         //    req.userId = decodeData?.sub
         // }

         next();
    } catch (error) {
        res.status(401).json('Not Authentificated')
        console.log(error)
    }
}
export default  auth