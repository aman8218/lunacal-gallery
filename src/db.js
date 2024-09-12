import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully.");
    } catch (error) {
        console.log('DB Connection Error', error);
    }
};

export default connectDB;
