import Goods from "../../api/models/Goods.js"

export const userHomeSearch = async (req, res) => {
      const { keyword } = req.body

      const goodsName = await Goods.find(
            { goodName: { $regex: new RegExp(keyword, 'i') } }, 
            { _id: 1, goodName: 1 }
      );
          
      res.json({ data: goodsName })
}