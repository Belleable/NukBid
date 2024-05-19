import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Bidding from "../../api/models/Bidding.js";
import Goods from "../../api/models/Goods.js";

//Success
export const userBiddingDelete = async (req, res) => {
      const { goodsid } = req.query
      const usercookie = req.cookies.userLoggedIn;
      const userid = jwt.decode(usercookie, process.env.JWT_SECRET).id;
      const goodsId = new mongoose.Types.ObjectId(goodsid);
      const userId = new mongoose.Types.ObjectId(userid);

      try {
            const checkTopBuyer = await Goods.findOne({$and: [{_id: goodsId}, {topBuyer: userId}]})
            console.log(checkTopBuyer)
            if (checkTopBuyer) {
                  res.json({success: false, text: "ลบไม่ได้ เนื่องจากขณะนี้คุณเป็นผู้ประมูลสูงสุด"})
            } else {
                  await Bidding.deleteOne({ $and: [{goodsID: goodsId}, {userID: userId}]})
                  res.json({success: true})
            }
      } catch (error) {
            console.log(error.message)
            res.json({success: false})
      }
}