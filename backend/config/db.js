import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://@cluster0.oif2dio.mongodb.net/food-del').then(()=>console.log("DataBase Connected"))
}
