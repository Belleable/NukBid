//import Goods from "../api/models/Goods.js";
import Pictures from "../api/models/Pictures.js";
import fs from "fs";

export const addPic = async (req, res) => {
    //const { goodName, openPrice, maxPrice, endTime, leastAdd, properties, endDate } = req.body;
    const allimage = [];

    //console.log("from req.files:  " + req.files[0].mimetype)
    //console.log(req.files)

    try {
        /*if ( !goodName || !openPrice || !maxPrice || !endDate || !endTime || !leastAdd || !properties) {
            return res.status(400).json({ success: false, text: "Please provide all necessary information and at least one image" });
        }*/
        //const combinedDateTimeString = `${endDate}T${endTime}`;
        //const changeTimezone = moment.utc(combinedDateTimeString).utcOffset(7 * 60).toDate();

        const fileToBase64 = (filePath) => {
            return new Promise((resolve, reject) => {
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        const base64Data = data.toString('base64');
                        resolve(base64Data)
                        //data.toString('base64')
                    }
                });
            });
        };
        
        /*const fileToBase64 = (filePath) => {
            return new Promise((resolve, reject) => {
                fs.readFileSync(filePath, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        const base64Data = data.toString('base64');
                        resolve(base64Data)
                    }
                });
            });
        };*/

        
            for (const file of req.files) {
                //const base64Image = await fileToBase64(file.path);
               
                console.log(file.filename)
                allimage.push({
                    contentType: file.mimetype,
                    data: file.filename
                });
            }
        

        //const newProduct = new Goods({ ...req.body, endTime: changeTimezone, status: "bidding" });
        //await newProduct.save();
        const newPics = new Pictures({ picLink: allimage})
            await newPics.save();
      

        res.json({ success: true, message: "Add product successfully"/*, product: newProduct, pics: newPics */});
        //res.json(newPics)

    } catch (error) {
        res.json({ success: false, text: "Failed to add product and images", error: error.message });
    }
};

//271997