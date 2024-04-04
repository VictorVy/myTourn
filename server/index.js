import express from "express";
import router from "./router.js";

const app = express();
app.use(express.static("dist"));
app.use((req, res) => {
    console.log(req.method, req.url);
    req.next();
});
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => console.log("Server is listening on port " + process.env.PORT + "..."));