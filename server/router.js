import express from "express";

const router = express.Router();

router.get("/api", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.json({ message: "Hello from server!" });
});

export default router;