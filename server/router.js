import express from "express";
import dbConnector from "./dbConnector.js";

dbConnector.initializePool().then(dbConnector.test);

const router = express.Router();

router.get("/api", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.json({ message: "Hello from server!" });
});

router.get("/api/teamPlayers/:teamId", async (req, res) => {
    const teamId = req.params.teamId;
    const teamPlayers = await dbConnector.getTeamPlayers(teamId);
    res.json(teamPlayers);
});

router.get("/api/numTournParticipants", async (req, res) => {
    const numParticipants = await dbConnector.getNumTournParticipants();
    res.json(numParticipants);
});

export default router;