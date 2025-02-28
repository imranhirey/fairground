import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import { getDocs } from "./controllers/authController";

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/auth_app")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/auth_app", //  should be in .env file but i hard coded for prototyping purpose only
    }),
  })
);

// Handlebars setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Routes
app.get("/docs", getDocs);
app.get("/clerk/docs", getDocs);


app.use("/", authRoutes);
// Start server
const PORT = 3000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);


export default app