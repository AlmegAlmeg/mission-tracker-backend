import mongoose from "mongoose";
import env from "dotenv";
env.config();

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION || "");
    console.log("Connected to database");
  } catch (error) {
    console.log(`Error connecting to database. \n${error}`);
  }
}
