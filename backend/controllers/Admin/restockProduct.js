import Bidding from "../../api/models/Bidding.js";
import Goods from "../../api/models/Goods.js";
import mongoose from "mongoose";

//Success
export const restockProduct = async (req, res) => {
      console.log('restock');
    const { new_time } = req.body;
    const { goodsID } = req.params;
    const goodsId = new mongoose.Types.ObjectId(goodsID);
    
    try {
        if ( !new_time ) {
            return res.json({ success: false, text: "กรุณาใส่วันปิดประมูลใหม่" });
        }

      //   const changeTimezone = moment.utc(time).utcOffset(7 * 60).toDate();  
      await Goods.updateOne({ _id: goodsId }, { $set: { topBuyer: null, endTime: new_time } });
      await Bidding.deleteMany({ goodsID: goodsId });
      res.json({success: true, text: "เปิดประมูลสินค้าอีกครั้งแล้ว"})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, text: "เพิ่มสินค้าไม่สำเร็จ", error: error });
    }
};

