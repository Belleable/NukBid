
import jwt from 'jsonwebtoken';

export const VerifyLoggedIn = async (req, res, next) => {
      const { user } = req.cookies

      if (!user) {
            return res.json({success: false, text: "กรุณาลงชื่อเข้าใช้งาน"})
      }
      next()
}

export const VerifyAdmin = async (req, res, next) => {
      const usercookie = req.cookies.userLoggedIn;
      const isAdmin = (jwt.decode(usercookie, process.env.JWT_SECRET)).isAdmin;
      
      if ( !isAdmin ) {
            res.json({success: false, text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้"})
      }
      next()
}

export const VerifyUser = async (req, res, next) => {
      const usercookie = req.cookies.userLoggedIn;
      const isAdmin = (jwt.decode(usercookie, process.env.JWT_SECRET)).isAdmin;
      
      if ( isAdmin ) {
            res.json({success: false, text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้"})
      }
      next()
}