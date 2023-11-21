import express from "express";
import { connectToDatabase } from "./db/connection";

const app = express();

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
connectToDatabase()
