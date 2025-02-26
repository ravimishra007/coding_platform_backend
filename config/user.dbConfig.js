import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectionToDb() {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Successfully connected to the database");
  } catch (error) {
    console.error("❌ Error connecting to the database:", error.message);
    process.exit(1); 
  }
}
