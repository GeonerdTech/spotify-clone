import express from "express";
import cors from "cors";
import connectCloudinary from "./src/config/cloudinary.js";
import "dotenv/config";
import connectDB from "./src/config/mongodb.js";
import songRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// 🔌 Connect DB & Cloudinary
connectDB();
connectCloudinary();

// ✅ CORS (simple & safe)
app.use(cors());

// ✅ Middlewares
app.use(express.json());

// ✅ Routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

// ✅ Test route
app.get("/", (req, res) => res.send("API Working"));

// ✅ Start server
app.listen(port, () => console.log(`Server started on ${port}`));
