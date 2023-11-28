const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const crawler = require("crawler-request");
const bodyParser = require("body-parser");
const app = express();
const options = {from: 0, to: 10};

app.use(bodyParser.json());

app.post("/extractPDFText", async (req, res) => {
    const pdfResult = await crawler(req.body.url);
    res.send({text: pdfResult.text});
});

app.post("/addToCSV", async (req, res) => {
    let { user, rating, details, timestamp } = req.body;
    const data = `"${user}","${rating}","${details}","${timestamp}"\n`;

    try {
        fs.appendFileSync("data.csv", data);
        res.send("Data saved successfully.");
    } catch (err) {
        console.error(err);
    }
});

app.post("/readFromCSV", async (req, res) => {
    fs.readFile("data.csv", "utf-8", (err, data) => {
        if (err) console.log(err);
        else res.send(data);
    });
});

app.post("/resetCSV", async (req, res) => {
    fs.writeFile("data.csv", "user,rating,details,timestamp\n", "utf-8", (err) => {
        if (err) console.log(err);
        else res.send("Data saved");
    });
});

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening to ${process.env.PORT}`);
})