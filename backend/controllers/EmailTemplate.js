import nodemailer from "nodemailer"
import fs from 'fs';
//import mao from "../public/images"

export const sendEmail = (product_link, bidder_email ) => {

      const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
            }
      });
      
      const mailOptions = (receiver) => {
            return {
                  from: '"NukBid Website💸 " process.env.EMAIL',            
                  to: receiver,              
                  subject: 'Notification from Nukbid',            
                  html: `
                        <!DOCTYPE html>
                        <html lang="en">
                              <head>
                                    <meta charset="UTF-8">
                                    <title> Notification From "NukBid" </title>
                                    <style>
                                    body {
                                      font-family: Arial, sans-serif;
                                    }
                                    .container {
                                      width: 100%;
                                      max-width: 600px;
                                      margin: 0 auto;
                                      padding: 20px;
                                      text-align: center;
                                      border: 1px solid #e0e0e0;
                                      border-radius: 10px;
                                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                    }
                                    h1 {
                                      color: blue;
                                    }
                                    p {
                                      margin: 20px 0;
                                    }
                                    .button {
                                      display: inline-block;
                                      padding: 10px 20px;
                                      font-size: 16px;
                                      color: white;
                                      background-color: blue;
                                      text-decoration: none;
                                      border-radius: 5px;
                                    }
                                    img {
                                      border-radius: 10px;
                                      width: 150px;
                                      margin-top: 20px;
                                    }
                                  </style>
                              </head>
                              <body>
                                    <div class="container">
                                          <h1> สินค้าของคุณมีผู้เสนอราคาแข่งแหละ! </h1>
                                          <p> ถ้าาหากไม่อยากถูกแย่งไปล่ะก็ รีบเสนอราคาแข่งสิ <a href=${product_link}>กดเลย!</a> <p>
                                          <img src="cid:maomao@nodemailer.com"/>
                                    </div>
                              </body>
                        </html>
                  `,
                  attachments: [
                        {
                            filename: 'logonukbid.jpg',
                            path: 'public/logonukbid.png',
                            cid: 'maomao@nodemailer.com'
                        },
                  ],
            };
      }
      
      transporter.sendMail(mailOptions(bidder_email), function (err, info) {
            if(err)
              console.log(`send email not success bz. ${err.message}`)
            else
                  console.log("send email success")
      });
}