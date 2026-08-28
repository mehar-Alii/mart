import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  Credential: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.status(200).json({ message: "Mart API is running" });
});

// routes import
import userRouter from './routes/user.router.js'
import addProductRouter from './routes/product.router.js'


// routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", addProductRouter)

// Global error handling middleware (must have 4 parameters and come AFTER all routes)
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || []
  });
});

export {app}