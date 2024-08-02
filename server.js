import express from "express"
import cors from "cors"
import { connect } from "mongoose"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import bodyParser from 'body-parser';
import { userLogin, userSignUp } from "./controllers/userController.js"
import cartRouter from "./routes/cartRoute.js"
import userRouter from "./routes/userRoute.js"



//app config
const app = express()
app.use(bodyParser.json());
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
    
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://achanya6895:Achanya@cluster0.i5xwwd0.mongodb.net/?