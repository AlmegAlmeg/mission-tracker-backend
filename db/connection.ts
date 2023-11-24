import mongoose from 'mongoose';
import env from 'dotenv';
import { logError } from '../utils/consoleMessage';
env.config();

export async function connectToDatabase() {
  try {
    let url = 'mongodb://127.0.0.1:27017/mission-tracker';
    if (process.env.MODE !== 'dev') url = process.env.MONGOOSE_CONNECTION || '';

    await mongoose.connect(url || '');
    console.log('Connected to database');
  } catch (error) {
    logError(error);
    console.log(`Error connecting to database. \n${error}`);
  }
}
