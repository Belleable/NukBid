import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from 'http';
import { Server } from 'socket.io';

//////////test
import router from "./api/routes/pages.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
}));
app.use(express.static('public'))

const mongoConnect = async () => {
      try {
            await mongoose.connect("mongodb+srv://autmango:atchima1234@cluster0.zpkk2wq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            console.log("Already connect to mongoDB");
      } catch (error) {
            throw error
      }
}

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

io.on("connection", (socket) => {
      console.log('user connected')
      socket.on('joinProductRoom', (id) => {
            socket.join(id); 
      });

      socket.on('newMessage', (message) => {
            console.log('New message received in backend:', message, message.id);
            socket.to(message.id).emit('newMessageNotification', message);
      });

      socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
})

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected")
})

mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connected")
})

app.use("/", router);

httpServer.listen(PORT, () => {
    mongoConnect();
    console.log("Server connected on " + PORT)
})
////////////////

/*dotenv.config();

import router from "./api/routes/pages.js"

const app = express();
const PORT = process.env.PORT;


const mongoConnect = async () => {
      try {
            await mongoose.connect("mongodb+srv://autmango:atchima1234@cluster0.zpkk2wq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            console.log("Already connect to mongoDB");
      } catch (error) {
            throw error
      }
}

app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected")
})

mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connected")
})

app.use("/", router);

app.listen(PORT, () => {
      mongoConnect();
      console.log("Already connect to backend! port " + PORT);
})*/

//////////test


////////////////