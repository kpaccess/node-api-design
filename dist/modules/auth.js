"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (user) => {
    const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || "");
    console.log("hello");
    console.log(" token ", token);
    return token;
};
exports.createJWT = createJWT;
const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        res.json({ message: "Not authorized" });
        return;
    }
    const [, token] = bearer.split(" ");
    console.log("hello111");
    console.log("token ", token);
    debugger;
    if (!token) {
        console.log("here");
        res.status(401);
        res.json({ message: "Not authorized" });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        req.user = payload;
        console.log(payload);
        next();
        return;
    }
    catch (e) {
        console.error(e);
        res.status(401);
        res.json({ message: "Not authorized" });
        return;
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map