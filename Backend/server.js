const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// routers
const UserRouter = require("./router/userRouter");
const productRoutes=require("./router/productsRouter")
const CartRouter=require("./router/cartRouter")

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("Database connection error:", err));

// Routes
app.use("/api/auth", UserRouter);
app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);
app.use("/api/cart", CartRouter);


// Default Route (optional but good)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
