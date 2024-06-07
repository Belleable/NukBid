import Goods from "../../api/models/Goods.js";
import Bidding from "../../api/models/Bidding.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

//Success All
export const userBidding = async (req, res) => {
      const usercookie = req.cookies.userLoggedIn;
      const userId = jwt.decode(usercookie, process.env.JWT_SECRET).id;
      const objectId = new mongoose.Types.ObjectId(userId);
      const bidding = (await Bidding.find({ userID:  objectId})).map(good => new mongoose.Types.ObjectId(good.goodsID));
      /*const allGoods = await Goods.find({$and: [{status: "bidding"}, {_id: bidding}]}).populate({
            path: "images",
            model: "Pics",
            select: "picLink"
      });*/
      console.log(bidding)
      const now = new Date();
    const nowWithZeroMilliseconds = new Date(now.setMilliseconds(0));
      try {
            const goods_bidding = await Goods.aggregate([
                  { 
                        $match: { 
                              _id: { $in: bidding }, 
                              endTime: {
                                $gte: new Date(nowWithZeroMilliseconds)
                            } 
                  } 
                  },
                  {
                      $lookup: {
                          from: "pictures",
                          localField: "_id",
                          foreignField: "goodsID",
                          as: "images"
                      }
                  },
                  { 
                      $unwind: "$images"
                  },
                  { 
                      $addFields: {
                          "firstPicLink": { $arrayElemAt: ["$images.picLink", 0] } 
                      }
                  },
                  {
                      $group: {
                          _id: "$_id",
                          goodName: { $first: "$goodName" },
                          maxPrice: { $first: "$maxPrice" },
                          endTime: { $first: "$endTime" },
                          firstImage: { $first: "$firstPicLink" }
                      }
                  },
                  {
                      $project: {
                          _id: 1,
                          goodName: 1,
                          maxPrice: 1,
                          endTime: 1,
                          image: {
                              contentType: "$firstImage.contentType",
                              data: "$firstImage.data"
                          }
                      }
                  }
              ]);
              console.log(goods_bidding)
            res.json({success: true, data: goods_bidding });
      } catch (error) {
            res.status(500).json({ message: "", error: error.message });
      }
}

export const userWin = async (req, res) => {
      const usercookie = req.cookies.userLoggedIn;
      const userId = jwt.decode(usercookie, process.env.JWT_SECRET).id;
      const objectId = new mongoose.Types.ObjectId(userId);
      console.log(objectId)
      //const biddingwin = (await Goods.find({$and: [{status: "end"}, {topBuyer: objectId}]})).map(good => new mongoose.Types.ObjectId(good.goodsID));
      /*const allGoods = await Goods.find({$and: [{status: "end"}, {topBuyer: userId}]}).populate({
            path: "images",
            model: "Pics",
            select: "picLink"
      });//Check status name อีกที*/

      try {
        const now = new Date();
        const nowWithZeroMilliseconds = new Date(now.setMilliseconds(0));
            const goods_bidwin = await Goods.aggregate([
                  { 
                      $match: { 
                          topBuyer: objectId, 
                          endTime: { $lte: new Date(nowWithZeroMilliseconds) }
                      }
                  },
                  {
                      $lookup: {
                          from: "pictures",
                          localField: "_id",
                          foreignField: "goodsID",
                          as: "images"
                      }
                  },
                  { 
                      $unwind: "$images"
                  },
                  { 
                      $addFields: {
                          "firstPicLink": { $arrayElemAt: ["$images.picLink", 0] } 
                      }
                  },
                  {
                      $group: {
                          _id: "$_id",
                          goodName: { $first: "$goodName" },
                          maxPrice: { $first: "$maxPrice" },
                          endTime: { $first: "$endTime" },
                          firstImage: { $first: "$firstPicLink" }
                      }
                  },
                  {
                      $project: {
                          _id: 1,
                          goodName: 1,
                          maxPrice: 1,
                          endTime: 1,
                          image: {
                              contentType: "$firstImage.contentType",
                              data: "$firstImage.data"
                          }
                      }
                  }
              ]);
              
              
            res.json({success: true, data: goods_bidwin });
      } catch (error) {
            res.status(500).json({ message: "", error: error.message });
      }
      //res.json({data: goods_bidwin});
}

//มาดูอีกทีว่าจะให้ส่งเป็นอะไรไป กับ อาจต้องเก็บรูปแรกไว้ในgoodsเลย