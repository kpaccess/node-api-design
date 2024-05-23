"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/**
 * Product
 */
router.get("/product", (req, res) => {
    res.json({ message: "product" });
});
router.get("/product/:id", (req, res) => { });
router.post("/product", (req, res) => { });
router.put("/product/:id", (req, res) => { });
router.delete("/product/:id", (req, res) => { });
/**
 * Update
 */
router.get("/update", (req, res) => { });
router.get("/update/:id", (req, res) => { });
router.post("/update", (req, res) => { });
router.put("/update/:id", (req, res) => { });
router.delete("/update/:id", (req, res) => { });
/**
 * UpdatePoint
 */
router.get("/updatepoint", (req, res) => { });
router.get("/updatepoint/:id", (req, res) => { });
router.post("/updatepoint", (req, res) => { });
router.put("/updatepoint/:id", (req, res) => { });
router.delete("/updatepoint/:id", (req, res) => { });
exports.default = router;
//# sourceMappingURL=router.js.map