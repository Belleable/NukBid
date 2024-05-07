import Users from "../../api/models/Users.js";
import jwt from 'jsonwebtoken'

export const editprofile = async (req, res) => {
      try {
        
        const bufferpicture = req.file.buffer
            const usercookie = req.cookies.userLoggedIn;
            const id = (jwt.decode(usercookie, process.env.JWT_SECRET)).id;
            const userpic = req.file.buffer
            //const binaryData = Buffer.from(userpic.dataUrl.split(',')[1], 'base64');
            const updateprofile = {$set: {...req.body, picture: userpic}};
            await Users.findByIdAndUpdate(id, updateprofile)
            
          res.json({success: true, text: "Edit your profile successfully"})
      } catch (error) {
          console.error("Error fetching goods:", error);
          res.json({ success: false, text: "Failed to fetch goods", error: error.message });
      }
};