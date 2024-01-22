import mongoose from "mongoose";
import { config } from './config'

export const connectDB = async () => {
    mongoose.set('strictQuery', false);
    try {
        const { connection } = await mongoose.connect(config.DB);
        console.log(`MongoDB connected with ${connection.host}`);
    } catch (error) {
        console.log(error)
    }
}