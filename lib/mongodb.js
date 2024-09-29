import mongoose from "mongoose";

// export เอาไปใช้
export const connectMongoDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongodb");
    }catch{
        console.log("Error connecting to mongodb: ", error);
    }
}
