import Users from "../../api/models/Users.js";
import jwt from 'jsonwebtoken'

export const editprofile = async (req, res) => {
      try {
        const usercookie = req.cookies.userLoggedIn;
        const id = (jwt.decode(usercookie, process.env.JWT_SECRET)).id;
        const { 
            fname,
            lname,
            email,
            tel,
            password,
            address
            } = req.body;
        const userpic = req.file

        var updateprofile;

        if (userpic === undefined || password === '') {
            if (password !== '') {
                updateprofile = {$set: { 
                    password: password,
                    fname: fname,
                    lname: lname,
                    email: email,
                    tel: tel,
                    address: address
                }}
            } else if (userpic !== undefined) {
                updateprofile = {$set: { 
                    picture: {contentType: userpic.mimetype, data: userpic.filename},
                    fname: fname,
                    lname: lname,
                    email: email,
                    tel: tel,
                    address: address
                }}
            } else {
                updateprofile = {$set: { 
                    fname: fname,
                    lname: lname,
                    email: email,
                    tel: tel,
                    address: address
                }}
            }
        } else {
            const salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT));
            const hash = bcrypt.hashSync(password, salt);
            updateprofile = {$set: { 
                password: hash,
                picture: {contentType: userpic.mimetype, data: userpic.filename},
                fname: fname,
                lname: lname,
                email: email,
                tel: tel,
                address: address
            }}
        }
        console.log(updateprofile)
        await Users.findByIdAndUpdate(id, updateprofile)
            
          res.json({success: true, text: "แก้ไขข้อมูลเรียบร้อยแล้ว"})
      } catch (error) {
          console.error("Error fetching goods:", error);
          res.json({ success: false, text: "มีข้อผิดพลาดเกิดขึ้น", error: error.message });
      }
};