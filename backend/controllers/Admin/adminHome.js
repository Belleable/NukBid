import Goods from "../../api/models/Goods.js";

//Success
export const adminHome = async (req, res) => {
      try {
        const now = new Date();
        const nowWithZeroMilliseconds = new Date(now.setMilliseconds(0));
          
            const allGoods = await Goods.aggregate([
                { 
                    $match: { 
                        endTime: {
                            $gte: new Date(nowWithZeroMilliseconds)
                            /*$lt: new Date("2024-07-31T23:59:59.999Z")*/
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
                    $sort: { _id: -1 }
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
          console.log(allGoods)
          res.json({success: true, data: allGoods});
    } catch (error) {
        console.error("Error fetching goods:", error);
        res.status(500).json({ success: false, text: "Failed to fetch goods" });
    }
};