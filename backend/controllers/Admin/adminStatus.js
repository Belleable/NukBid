import Goods from "../../api/models/Goods.js";


//Success
export const goodsSuccess = async (req, res) => {
      /*const allGoods = await Goods.find({ status: "success" }).populate({
            path: "images",
            model: "Pics",
            select: "picLink"
      });
      res.json(allGoods);*/
      try {
        const now = new Date();
        const nowWithZeroMilliseconds = new Date(now.setMilliseconds(0));
          
            const allGoods = await Goods.aggregate([
                { 
                    $match: { 
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
                    $sort: { endTime: -1 }
                },
                {
                    $project: {
                        _id: 1,
                        goodName: 1,
                        maxPrice: 1,
                        endTime: 1,
                        image: {
                            contentType: "$firstImage.contentType",
                            // data: "$firstImage.data"
                        }
                    }
                }
        ]);
          
          res.json({success: true, data: allGoods});
    } catch (error) {
        console.error("Error fetching goods:", error);
        res.status(500).json({ success: false, text: "Failed to fetch goods" });
    }
}