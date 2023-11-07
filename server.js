import express  from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js"
import serviceRoutes from "./routes/serviceRoute.js"
import cors from "cors";
import path from "path"


dotenv.config();

connectDB();

const app= express();

app.use(cors());

app.use(express.json());
app.use(morgan(`dev`));

app.use(express.static(path.join(__dirname,"./my-app/build")))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use("/api/v1/product", serviceRoutes)


app.get("*", function(req,res){
    res.sendFile(path.join(__dirname, './my-app/build/index.html'))
})


app.get('/',(req,res)=>{
    res.send({
        message:'welcome to app'
    })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`server ${process.env.DEV_MODE} running on ${PORT}`)
})