"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.postRegister = exports.getDocs = exports.getRegister = exports.postLogin = exports.getLogin = exports.getHome = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getHome = (req, res) => {
    var _a;
    //@ts-ignore
    res.render('home', { user: (_a = req.session) === null || _a === void 0 ? void 0 : _a.user });
};
exports.getHome = getHome;
const getLogin = (req, res) => {
    res.render('login');
};
exports.getLogin = getLogin;
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield User_1.default.findOne({ username });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        //@ts-ignore
        req.session.user = { _id: user._id.toString(), username: user.username };
        res.redirect('/');
    }
    else {
        res.redirect('/login');
    }
});
exports.postLogin = postLogin;
const getRegister = (req, res) => {
    res.render('register');
};
exports.getRegister = getRegister;
// for quick prototyping only -> this should be in separate file for speartion of concerns
const getDocs = (req, res) => {
    res.render('/docs');
};
exports.getDocs = getDocs;
const postRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Check if the username already exists
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            return res.render('register', { error: 'Username already exists. Please choose a different username.' });
        }
        // Create a new user
        const user = new User_1.default({ username, password });
        yield user.save();
        res.redirect('/login');
    }
    catch (error) {
        //@ts-ignore
        if (error.code === 11000) { // MongoDB duplicate key error code
            return res.render('register', { error: 'Username already exists. Please choose a different username.' });
        }
        console.error('Registration error:', error);
        res.status(500).render('register', { error: 'An error occurred during registration. Please try again.' });
    }
});
exports.postRegister = postRegister;
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
exports.logout = logout;
