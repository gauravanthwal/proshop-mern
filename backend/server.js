import dotenv from "dotenv";
import path from "path";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import productRoute from "./src/routes/productRoute.js";
import usersRoute from "./src/routes/userRoute.js";
import orderRoute from "./src/routes/orderRoute.js";
import uploadRoute from "./src/routes/uploadRoute.js";
import { notFount, errorHandler } from "./src/middlewares/errorMiddleware.js";
// import { PAYPAL_CLIENT_ID } from "./src/config/config.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Configurations
connectDB();
app.use(cors());
app.use(express.json());

// API Routes
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use("/api/products", productRoute);
app.use("/api/users", usersRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/backend/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("hi");
  });
}

// Custom Error Handling
app.use(notFount);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running at port ${PORT}`));
