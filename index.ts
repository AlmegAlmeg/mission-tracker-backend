import express from "express";
import { connectToDatabase } from "./db/connection";
import { LoginRouter } from "./routes/login";

const PORT = 3333;
const app = express();

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

connectToDatabase()

app.use(express.json());

app.use('/', LoginRouter);