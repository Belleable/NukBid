import Users from "../../api/models/Users.js";
import jwt from 'jsonwebtoken'

export const profile = async (req, res) => {
      try {
        
          const usercookie = req.cookies.userLoggedIn;
          const id = (jwt.decode(usercookie, process.env.JWT_SECRET)).id;
          const userprofile = await Users.find({ _id: id})
          
          res.json({success: true, data: userprofile});
      } catch (error) {
          console.error("Error fetching goods:", error);
          res.status(500).json({ success: false, text: "Failed to fetch goods", error: error.message });
      }
};