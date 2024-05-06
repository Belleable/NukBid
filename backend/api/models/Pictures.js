import mongoose from "mongoose";

const picturesSchema = new mongoose.Schema({
      
      picLink: [
            {
                  contentType: String,
                  data: String
            }/*,
            {
                  contentType: String,
                  data: Buffer
            },
            {
                  contentType: String,
                  data: Buffer
            },
            {
                  contentType: String,
                  data: Buffer
            },
            {
                  contentType: String,
                  data: Buffer
            }*/
      ],
      goodsID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Goods"
      },
})

export default mongoose.model('pictures', picturesSchema)