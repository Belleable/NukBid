import Users from "../api/models/Users.js";
import bcrypt from "bcrypt";
import { text } from "express";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
      const { username, password } = req.body;
      if (!username || !password ) {
            res.json({text: "Please enter your username or email and password"})
      }

      const findUser = await Users.findOne({$or: [{username: username}, {email: username}]});
      if (!findUser) {
            res.json({text: "Don't found this user"})
      }
      console.log(findUser.password)
      const salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT));
      const hash = bcrypt.hashSync(password, salt);
      try {
            /*bcrypt.compare(salt, findUser.password, (err, isMatch) => {
                  if (err) {
                        console.log(err);
                  }
                  console.log(isMatch)
                  if(isMatch === true) {
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

                        res.cookie("userLoggedIn", token, cookieOptions).json({ success: true, text: "User logged in"});
                  } else {
                        res.json({success: false, text: "Wrong Password"})
                  }
            })*/
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
            res.cookie("userLoggedIn", token, cookieOptions).setHeader('Content-Type', 'application/json').json({ success: true, text: "User logged in"});

      } catch (error) {
            console.log(error)
      }
}