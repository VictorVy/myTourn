import express from "express";
import router from "./router.js";

const app = express();
app.use(express.static("dist"));
app.use((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    console.log(req.method, req.url);
    req.next();
});
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => console.log("Server is listening on port " + process.env.PORT + "..."));