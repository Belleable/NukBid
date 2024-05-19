import Users from "../../api/models/Users.js";
import jwt from 'jsonwebtoken'

export const editprofile = async (req, res) => {
      try {
        const usercookie = req.cookies.userLoggedIn;
        const id = (jwt.decode(usercookie, process.env.JWT_SECRET)).id;
        const { ...data } = req.body;
        const userpic = req.file
        
        if (userpic === undefined) {
            const updateprofile = {$set: {...data}};
            await Users.findByIdAndUpdate(id, updateprofile)
        } else {
            const updateprofile = {$set: {...data, picture: {contentType: userpic.mimetype, data: userpic.filename}}};
            await Users.findByIdAndUpdate(id, updateprofile)
        }
        //const binaryData = Buffer.from(userpic.dataUrl.split(',')[1], 'base64');
        /*const updateprofile = {$set: {...req.body, picture: userpic}};
        await Users.findByIdAndUpdate(id, updateprofile)*/
            
          res.json({success: true, text: "Edit your profile successfully"})
      } catch (error) {
          console.error("Error fetching goods:", error);
          res.json({ success: false, text: "Failed to fetch goods", error: error.message });
      }
};