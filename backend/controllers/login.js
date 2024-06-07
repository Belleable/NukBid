import Users from "../api/models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
      const { username, password } = req.body;
      if (!username || !password ) {
            res.json({text: "กรุณาหรอกอีเมลและรหัสผ่านให้ครบถ้วน"})
      }

      try {
            const findUser = await Users.findOne({$or: [{username: username}, {email: username}]});
            if (!findUser) {
                  return res.json({success: false, text: "ไม่มีบัญชีผู้ใช้นี้", error: "account"})
            }

            const match = await bcrypt.compare(password, findUser.password);
            if (!match) {
                  return res.json({success: false, text: "รหัสผ่านไม่ถูกต้อง", error: "password"})
            }

            const token = jwt.sign(
                  { id: findUser._id, isAdmin: findUser.isAdmin },
                  process.env.JWT_SECRET,
                  { expiresIn: process.env.JWT_EXPIRES }
            );
            const cookieOptions = {
                  expiresIn: new Date( Date.now() + parseInt(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000),
                  httpOnly: true,
                  path: '/'
            };
            res.cookie("userLoggedIn", token, cookieOptions).setHeader('Content-Type', 'application/json').json({ success: true, text: "ลงชื่อเข้าใช้งานแล้ว", isAdmin: findUser.isAdmin});

      } catch (error) {
            console.log(error)
      }
}