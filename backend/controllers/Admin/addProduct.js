import Goods from "../../api/models/Goods.js";
import Pictures from "../../api/models/Pictures.js";
import fs from "fs";
import moment from "moment";


//Success
export const addProduct = async (req, res) => {
    const { goodName, openPrice, time, leastAdd, properties } = req.body;
    const allimage = [];
    
    try {
        /*if ( !goodName || !openPrice || !maxPrice || !endDate || !endTime || !leastAdd || !properties) {
            return res.status(400).json({ success: false, text: "Please provide all necessary information and at least one image" });
        }*/
        /*const combinedDateTimeString = `${endDate}T${endTime}`;
        const changeTimezone = moment.utc(combinedDateTimeString).utcOffset(7 * 60).toDate();

        for (const file of req.files) {
            allimage.push({
                contentType: file.mimetype,
                data: file.filename
            });
        }
        

        const newProduct = new Goods({ ...req.body, endTime: changeTimezone, status: "bidding" });
        await newProduct.save();

        const newPics = new Pictures({ picLink: allimage, goodsID: newProduct._id });
        await newPics.save();*/

        //res.json({ success: true, message: "Add product successfully"/*, product: newProduct, pics: newPics */});
        //res.json(newPics)
        //const decodedImages = images.map(image => Buffer.from(image, 'base64'));

        if ( !goodName || !openPrice || !time || !leastAdd || !properties || !req.files) {
            return res.status(400).json({ success: false, text: "โปรดใส่ข้อมุลให้ครบทุกช่อง และใส่รูปสินค้าอย่างน้อย 1 รูป" });
        }
        
        /*const timeSplit = time.split('T')
        console.log(timeSplit[0]  "   :  " + timeSplit[1])*/
        //const combinedDateTimeString = `${date}T${selecttime}`;
        
        //This is true
        const changeTimezone = moment.utc(time).utcOffset(7 * 60).toDate();
        
        console.log(changeTimezone)        

        for (const file of req.files) {
            console.log(file.filename)
            allimage.push({
                contentType: file.mimetype,
                data: file.filename
            });
        }

        const newProduct = new Goods({ ...req.body, maxPrice: openPrice, endTime: time, status: "bidding" });
        await newProduct.save();

        const newPics = new Pictures({ picLink: allimage, goodsID: newProduct._id });
        await newPics.save();

        console.log(allimage)
        res.json({success: true, text: "เพิ่ทสินค้าเรียบร้อยแล้ว"})

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, text: "Failed to add product and images", error: error });
    }
};

