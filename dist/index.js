"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_handlebars_1 = require("express-handlebars");
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authController_1 = require("./controllers/authController");
const app = (0, express_1.default)();
// Connect to MongoDB
mongoose_1.default
    .connect("mongodb://localhost:27017/auth_app")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
// Middleware
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: "mongodb://localhost:27017/auth_app",
    }),
}));
// Handlebars setup
app.engine("handlebars", (0, express_handlebars_1.engine)());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
// Routes
app.get("/docs", authController_1.getDocs);
app.get("/clerk/docs", authController_1.getDocs);
app.use("/", authRoutes_1.default);
// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
