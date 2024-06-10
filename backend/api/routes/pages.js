import express from "express";
import multer from "multer";
import path from "path";

import { signup } from "../../controllers/signup.js";
import { login } from "../../controllers/login.js";
import { logout } from "../../controllers/logout.js";
import { userHome } from "../../controllers/User/userHome.js";
import { addProduct } from "../../controllers/Admin/addProduct.js";
import { userBidding, userWin } from "../../controllers/User/userStatus.js";
import { profile } from "../../controllers/User/profile.js";
import { goodInfo } from "../../controllers/goodInfo.js";
import { goodsSuccess } from "../../controllers/Admin/adminStatus.js";
import { editprofile } from "../../controllers/User/editProfile.js";
import { userHomeSearch, userHomeSearchGoodName } from "../../controllers/User/userHomeSearch.js";
import { adminHome } from "../../controllers/Admin/adminHome.js";
import { goodBidding } from "../../controllers/User/goodBidding.js";
import { userBiddingDelete } from "../../controllers/User/userBiddingDelete.js";
import { navbarPic } from "../../controllers/User/navbarPic.js";
import { restockProduct } from "../../controllers/Admin/restockProduct.js";
import { checkAuth } from "../../controllers/checkAuth.js"; 
import { winnerProfile } from "../../controllers/Admin/winnerProfile.js";

const router = express.Router();
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
            cb(null, 'public')
      },
      filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
})

const upload = multer({storage: storage})

////////////////////////////// Real
router.get('/checkauth', checkAuth)

router.post('/register', signup)//
router.post('/login', login)//
router.get('/logout', logout)//
router.get('/navbarpic', navbarPic)//ดึงรูปมาโชว์ Navbar


/* -----  Admin ----- */
router.get('/admin/home', adminHome)//
router.get('/admin/products/success', goodsSuccess)//
router.post('/admin/home/addproduct', upload.array("images", 5), addProduct)//
router.get('/admin/products/:goodsID', goodInfo)//
router.put('/restock/:goodsID', restockProduct)
router.get('/winner/profile/:username', winnerProfile)

/* ----- User ----- */
router.get('/user/home', userHome)//
router.post('/findGoodName', userHomeSearchGoodName)//search ชื่อสินค้า
router.get('/user/results/:keyword', userHomeSearch)//
router.get('/user/products/bidding', userBidding)//สินค้าที่ประมูลอยู่
router.delete('/user/products/bidding', userBiddingDelete)//เลิกประมูลสินค้าที่ประมูลอยู่
router.get('/user/products/win', userWin)//ประมูลชนะแล้ว
router.get('/user/products/:goodsID', goodInfo)//
router.put('/user/products/:goodsID', goodBidding)//ประมูลสินค้า
router.get('/user/profile', profile)// 
router.put('/user/profile/edit',upload.single('picture'), editprofile)//

/* ---- Belle Path ---- */
router.get('/myproducts', userWin)
router.get('/detail/:goodsID', goodInfo)

/* Alreary success */
//goodInfo, VerifyAdmin and User, Login(อย่าลืมแก้เข้ารหัสคืนด้วย), Signup, Logout, 
//userStatus, userHome, search in userHome, adminHome, editProfile

//ดูเรื่องรูป

export default router;