import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDb.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(cookieParser());

//Cors
const allowdOrigins = ["http://localhost:5173"];
app.use(cors({ origin: allowdOrigins, credentials: true }));

//API
app.get("/", (req, res) => {
  res.send("API working");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
