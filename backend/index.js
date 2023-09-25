import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./Router/Router.js";

const app = express()
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api",router);
app.use(cors());

app.use(bodyParser.json())

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}
);
const DB = process.env.DB_URL;

mongoose.connect(DB,{
   useNewUrlParser:true,
   useUnifiedTopology:true,
}).then(()=>{
   console.log(`DB connected`);
}).catch((err)=>console.log(`not connected `,err));