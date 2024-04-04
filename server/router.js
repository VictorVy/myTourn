import express from "express";
import dbConnector from "./dbConnector.js";

dbConnector.initializePool();

const router = express.Router();

router.get("/api", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.json({ message: "Hello from server!" });
});

router.get("/api/query", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    const { selectList, fromList, whereClause, groupList, havingClause, orderList } = req.query;
    const result = await dbConnector.executeQuery(selectList, fromList, whereClause, groupList, havingClause, orderList);
    res.json(result);
});

router.post("/api/insert", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    const { table, columns, valuesArr } = req.body;
    const result = await dbConnector.executeInsert(table, columns, valuesArr);
    res.json(result);
});

router.patch("/api/update", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    const { table, setList, whereClause } = req.body;
    const result = await dbConnector.executeUpdate(table, setList, whereClause);
    res.json(result);
});

router.delete("/api/delete", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    const { table, whereClause } = req.body;
    const result = await dbConnector.executeDelete(table, whereClause);
    res.json(result);
});

router.get("/api/teamPlayers/:teamId", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    const teamId = req.params.teamId;
    const teamPlayers = await dbConnector.getTeamPlayers(teamId);
    res.json(teamPlayers);
});

router.get("/api/numTournParticipants", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    const numParticipants = await dbConnector.getNumTournParticipants();
    res.json(numParticipants);
});

router.get("/api/popularGames", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    const popularGames = await dbConnector.getPopularGames();
    res.json(popularGames);
});

router.get("/api/highestAvgViewershipPlatform", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    const platform = await dbConnector.getHighestAvgViewershipPlatform();
    res.json(platform);
});

router.get("/api/mvps", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    const mvps = await dbConnector.getMVPs();
    res.json(mvps);
});

export default router;