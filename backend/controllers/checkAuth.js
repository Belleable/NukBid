
import jwt from "jsonwebtoken"

export const checkAuth = async (req, res) => {
    const usercookie = req.cookies.userLoggedIn;
    // console.log(usercookie);
    if (usercookie) {
      const userIsAdmin = jwt.decode(usercookie, process.env.JWT_SECRET).isAdmin;
      // console.log(userIsAdmin);
      res.json({success: true, isAdmin: userIsAdmin})
    } else {
      res.json({success: false})
    }
  
}