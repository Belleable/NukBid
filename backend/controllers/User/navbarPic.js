import Users from "../../api/models/Users.js";
import jwt from "jsonwebtoken"

export const navbarPic = async (req, res) => {
      const usercookie = req.cookies.userLoggedIn;
      const id = (jwt.decode(usercookie, process.env.JWT_SECRET)).id;
      const userprofile = await Users.find({ _id: id})

      // console.log(userprofile[0].picture)
      res.json({success: true, data: userprofile[0].picture})
}