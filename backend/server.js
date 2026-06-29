const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const Issue = require("./models/Issue");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Backend Running");
});


// CREATE ISSUE
app.post("/issues", async (req, res) => {
    try {
        const issue = await Issue.create(req.body);
        res.status(201).json(issue);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// READ ALL ISSUES
app.get("/issues", async (req, res) => {
    try {
        const issues = await Issue.find();
        res.json(issues);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// UPDATE ISSUE
app.put("/issues/:id", async (req, res) => {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedIssue);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// DELETE ISSUE
app.delete("/issues/:id", async (req, res) => {
    try {
        await Issue.findByIdAndDelete(req.params.id);

        res.json({
            message: "Issue deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});