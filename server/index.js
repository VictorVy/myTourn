import express from "express";
import dbConnector from "./dbConnector.js";
import router from "./router.js";

dbConnector.initializePool().then(dbConnector.test);

const app = express();
app.use(express.static("dist"));
app.use(router);

app.listen(process.env.PORT, () => console.log("Server is listening on port " + process.env.PORT + "..."));