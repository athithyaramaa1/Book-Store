import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());

app.use(express.json());

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(req);
  return res.status(234).send("Hello MERN aaaaaaaaaaaaaaaaaaaaa");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB😎");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
