import Bidding from "../../api/models/Bidding.js";
import Goods from "../../api/models/Goods.js";
import nodemailer from "nodemailer";
import { sendEmail } from "../EmailTemplate.js";
import Users from "../../api/models/Users.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


//Success
export const goodBidding = async (req, res) => {
      const { price } = req.body;
      const { goodsID } = req.params;
      const usercookie = req.cookies.userLoggedIn;
      const userId = jwt.decode(usercookie, process.env.JWT_SECRET).id;
      const goodsId = new mongoose.Types.ObjectId(goodsID);
      const objectId = new mongoose.Types.ObjectId(userId);
  
      try {
          const allUser_bidding = await Bidding.aggregate([
              {
                  $match: {
                      goodsID: goodsId
                  }
              },
              {
                  $lookup: {
                      from: "users",
                      localField: "userID",
                      foreignField: "_id",
                      as: "user"
                  }
              },
              {
                  $unwind: "$user"
              },
              {
                  $project: {
                      userID: "$userID",
                      email: "$user.email" // Assuming email is stored in the 'email' field of the 'user' document
                  }
              }
          ]);
  
          console.log(allUser_bidding);
            //Check ว่าชนกับคนอื่นมั้ย กับ ทำแจ้งเตือน
            const hasBid = allUser_bidding.some(bid => bid.userID.equals(objectId));
            if (hasBid === false) {
                  await Bidding.insertMany({ userID: objectId, goodsID: goodsId })
            }
            
            await Goods.findOneAndUpdate({ _id: goodsId }, { topBuyer: objectId, maxPrice: price })
            sendEmail('link_product', allUser_bidding.map(user => user.email))
            res.json({success: true, text: "บิดล้ะ"})
      } catch (error) {
            console.log(error)
            res.json({ success: false, text: "Failed to bid good", error: error.message });
      }
}