import mongoose from "mongoose";

const picturesSchema = new mongoose.Schema({
      
      picLink: [
            {
                  contentType: String,
                  data: String
            }
      ],
      goodsID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Goods"
      },
})

export default mongoose.model('pictures', picturesSchema)