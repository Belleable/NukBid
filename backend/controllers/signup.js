import Users from "../api/models/Users.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
      const { username, password, fname, lname, email, tel, address } = req.body;
      if (!username || !password || !fname || !lname || !email || !tel || !address ) {
            res.json({success: false, text: "Please enter all your information"})
      }
      const findUser = await Users.findOne({ $or: [ {email: email}, {username: username} ] });
      if (findUser) {
            /*if ( findEmail && findEmail) {
                  res.json({text: "This username and email have been sign up"})
            }
            else if (findUsername) {
                  res.json({text: "This username has been sign up"})
            }
            else {
                  res.json({text: "This email has been sign up"})
            }*/
            res.json({success: false, text: "ชื่อบัญชีนี้มีผู้ใช้งานแล้ว", error: "account"})
      }

      const salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT));
      const hash = bcrypt.hashSync(password, salt);
      
      const newUser = new Users({...req.body, password: hash});
      try {
            await Users.insertMany(newUser);
      } catch (error) {
            res.json({success: false, text: "ลงทะเบียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"})
      }
      res.json({success: true, text: "ลงทะเบียนเรียบร้อยแล้ว"})

}