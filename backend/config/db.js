import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://akshaybauskar47:Akshu4254@cluster0.oif2dio.mongodb.net/food-del').then(()=>console.log("DataBase Connected"))
}