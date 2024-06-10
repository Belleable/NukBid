import Users from "../api/models/Users.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const { username, password, fname, lname, email, tel, address } = req.body;

    // Validate input fields
    if (!username || !password || !fname || !lname || !email || !tel || !address) {
        return res.json({ success: false, text: "Please enter all your information" });
    }

    try {
        // Check if the username already exists
        const findUser = await Users.findOne({ username: username });
        if (findUser) {
            return res.json({ success: false, text: "ชื่อบัญชีนี้มีผู้ใช้งานแล้ว", error: "account" });
        }

        // Generate salt and hash the password
        const salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT, 10));
        const hash = bcrypt.hashSync(password, salt);

        // Create a new user with the hashed password
        const newUser = new Users({ ...req.body, password: hash });

        // Save the new user to the database
        await newUser.save();
        
        res.json({ success: true, text: "ลงทะเบียนเรียบร้อยแล้ว" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, text: "ลงทะเบียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" });
    }
};
