import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import { signup } from "../../controllers/signup.js";
import { login } from "../../controllers/login.js";
import { logout } from "../../controllers/logout.js";
import { userHome } from "../../controllers/User/userHome.js";
import { VerifyAdmin, VerifyUser } from "../../controllers/verify.js";
import { addProduct } from "../../controllers/Admin/addProduct.js";
import { userBidding, userWin } from "../../controllers/User/userStatus.js";
import { profile } from "../../controllers/User/profile.js";
import { goodInfo } from "../../controllers/goodInfo.js";
import { goodsSuccess } from "../../controllers/Admin/adminStatus.js";
import { editprofile } from "../../controllers/User/editProfile.js";
import { userHomeSearch } from "../../controllers/User/userHomeSearch.js";
import { adminHome } from "../../controllers/Admin/adminHome.js";
import { goodBidding } from "../../controllers/User/goodBidding.js";
import { sendEmail } from "../../controllers/sendEmail.js";
import { addPic } from "../../controllers/addPic.js";
import { userBiddingDelete } from "../../controllers/User/userBiddingDelete.js";

const router = express.Router();
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
            cb(null, 'public')
      },
      filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
            //Date.now() + path.extname(file.originalname)
      }
})

//const upload = multer()
const upload = multer({storage: storage})
const uploadprofile = multer({storage: multer.memoryStorage()})

/////////////// Test
router.post('/sendtext', sendEmail)
router.get('/testlive/:id', (req, res) => {
      res.json("hello")
})
router.post('/addpic', upload.array('image', 5), addPic)

////////////////////////////// Real
router.post('/admin', VerifyAdmin)
router.post('/user', VerifyUser)

router.post('/register', signup)//
router.post('/login', login)//
router.get('/logout', logout)//

/* -----  Admin ----- */
router.get('/admin/home', adminHome)//
router.get('/admin/products/success', goodsSuccess)//
router.post('/admin/home/addProduct', upload.array('image', 5), addProduct)//
router.get('/admin/products/:goodsid', goodInfo)//

/* ----- User ----- */
router.get('/user/home', userHome)//
router.post('/user/home', userHomeSearch)//
router.get('/user/products/bidding', userBidding)//
router.delete('/user/products/bidding', userBiddingDelete)//
router.get('/user/products/win', userWin)//
router.get('/user/products/:goodsid', goodInfo)//
router.put('/user/products/:goodsid', goodBidding)
router.get('/user/profile', profile)// checkอีกที
router.put('/user/profile/edit',uploadprofile.single('picture'), editprofile)//

/* ---- Belle Path ---- */
router.get('/myproducts', userWin)
router.post('/search', userHomeSearch)
router.get('/bidding', userBidding)
router.get('/detail/:goodsID', goodInfo)
router.get

/* Alreary success */
//goodInfo, VerifyAdmin and User, Login(อย่าลืมแก้เข้ารหัสคืนด้วย), Signup, Logout, 
//userStatus, userHome, search in userHome, adminHome, editProfile

//ดูเรื่องรูป

export default router;