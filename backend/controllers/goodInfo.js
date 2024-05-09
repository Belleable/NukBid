import Goods from "../api/models/Goods.js";
import mongoose from "mongoose";
import Pictures from "../api/models/Pictures.js";

export const goodInfo = async (req, res) => {
    const { goodsID } = req.params;
    const objectId = new mongoose.Types.ObjectId(goodsID);

    console.log(goodsID); // Logging goodsID for debugging

    try {
        const good_info = await Goods.aggregate([
            { $match: { _id: objectId } },
            {
                $lookup: {
                    from: "users",
                    localField: "topBuyer",
                    foreignField: "_id",
                    as: "topBuyer"
                }
            },
            {
                $project: {
                    _id: 1,
                    maxPrice: 1,
                    endTime: 1,
                    leastAdd: 1,
                    properties: 1,
                    topBuyer: {
                        $arrayElemAt: ["$topBuyer", 0]
                    }
                }
            },
            {
                $addFields: {
                    "topBuyer_username": "$topBuyer.username",
                    "topBuyer_picture": "$topBuyer.picture"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    maxPrice: { $first: "$maxPrice" },
                    endTime: { $first: "$endTime" },
                    leastAdd: { $first: "$leastAdd" },
                    properties: { $first: "$properties" },
                    topBuyer_username: { $first: "$topBuyer_username" },
                    topBuyer_picture: { $first: "$topBuyer_picture" }
                }
            }
        ]);

        //const picture = await Pictures.findOne({goodsID: objectId})
        const pictures = await Pictures.aggregate([
            { $match: { goodsID: objectId } },
            {
                $project: {
                    picLink: {
                        $map: {
                            input: "$picLink",
                            as: "pic",
                            in: {
                                original: { $concat: ["http://localhost:3380/", "$$pic.data", "/1000/600/"] },
                                thumbnail: { $concat: ["http://localhost:3380/", "$$pic.data", "/250/150/"] }
                                //original: { $concat: ["$$pic.data"] },
                                //thumbnail: { $concat: ["$$pic.data"] }
                            }
                        }
                    }
                }
            }
        ]);
        
        const formattedPictures = pictures.map(item => item.picLink);
        //good_info[0].picture = formattedPictures
        //console.log(good_info)
        res.json({success: true, data: good_info, picture: formattedPictures})
        
    } catch (error) {
        console.error(error);
    }
    
};
