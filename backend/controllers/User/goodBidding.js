import Bidding from "../../api/models/Bidding.js";
import Goods from "../../api/models/Goods.js";
import nodemailer from "nodemailer";
import { sendEmail } from "../EmailTemplate.js";
import Users from "../../api/models/Users.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


//Success
export const goodBidding = async (req, res) => {
    const { price, datetime_new, datetime_old } = req.body;
    const { goodsID } = req.params;
    const usercookie = req.cookies.userLoggedIn;
    const userId = jwt.decode(usercookie, process.env.JWT_SECRET).id;
    const goodsId = new mongoose.Types.ObjectId(goodsID);
    const objectId = new mongoose.Types.ObjectId(userId);

    const datetimeNew = new Date(datetime_new);
    const datetimeOld = new Date(datetime_old);

    const timeDifference = datetimeOld - datetimeNew;

    const timeDifferenceInMinutes = timeDifference / 1000 / 60;

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
                    email: "$user.email"
                }
            }
        ]);

        //Check ว่าชนกับคนอื่นมั้ย
        const hasBid = allUser_bidding.some(bid => bid.userID.equals(objectId));
        if (hasBid === false) {
                await Bidding.insertMany({ userID: objectId, goodsID: goodsId })
        }
        //Check ว่าประมูลเข้ามาตอน 5 นาทีสุดท้ายมั้ย แล้วเพิ่มเวลาอีก10นาที
        if (timeDifferenceInMinutes <= 5 && timeDifferenceInMinutes > 0) {
            const newEndTime = new Date(datetimeOld);
            newEndTime.setMinutes(newEndTime.getMinutes() + 10);
            console.log(`New end time: ${newEndTime}`);
            await Goods.findOneAndUpdate({ _id: goodsId }, { topBuyer: objectId, maxPrice: price, endTime: newEndTime })
        } else if (timeDifferenceInMinutes <= 0){
            return res.json({success: false, text: 'หมดเวลาในการประมูลแล้ว'})
        } else {
            await Goods.findOneAndUpdate({ _id: goodsId }, { topBuyer: objectId, maxPrice: price })
        }
        sendEmail(`http://localhost:5173/user/detail/${goodsID}`, allUser_bidding.map(user => user.email))
        res.json({success: true, text: "เสนอราคาแล้วเรียบร้อย"})
    } catch (error) {
        console.log(error)
        res.json({ success: false, text: "เสนอราคาไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", error: error.message });
    }
}