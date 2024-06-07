import Goods from "../../api/models/Goods.js"

//Success
export const userHomeSearch = async (req, res) => {
      const { keyword } = req.params

      const goodsName = await Goods.find(
            { goodName: { $regex: new RegExp(keyword, 'i') } }, 
            { _id: 1, goodName: 1 }
      );

      try {
            const allGoods = await Goods.aggregate([
                  {
                      $match: {
                          $and: [
                              { goodName: { $regex: new RegExp(keyword, 'i') } },
                              { status: 'bidding' }
                          ]
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
                      $sort: { endTime: 1 }
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
              res.json({success: true, data: allGoods})
      } catch (error) {
            console.log(error)
      }
}

export const userHomeSearchGoodName = async (req, res) => {
    const { keyword } = req.body


    try {
        const goodsName = await Goods.find(
            { goodName: { $regex: new RegExp(keyword, 'i') } }, 
            { _id: 1, goodName: 1 }
        );
            
        res.json({success: true, data: goodsName})
    } catch (error) {
          console.log(error)
    }
}