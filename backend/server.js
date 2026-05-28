const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.listen(8080, () => {
    console.log("Server Running on 8080...");
});