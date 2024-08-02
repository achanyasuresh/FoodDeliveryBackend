import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://achanya6895:Achanya@cluster0.i5xwwd0.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}