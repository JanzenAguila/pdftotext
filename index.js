const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const fs = require("fs");
const crawler = require("crawler-request");
const bodyParser = require("body-parser");
const app = express();
const options = {from: 0, to: 10};

const readCSV = async () => {
    const my_file = await s3.getObject({
        Bucket: "cyclic-weak-pink-prawn-slip-ap-south-1",
        Key: "data.json",
    }).promise()

    return(JSON.parse(my_file.Body.toString('utf-8')));
}

app.use(bodyParser.json());

app.post("/extractPDFText", async (req, res) => {
    const pdfResult = await crawler(req.body.url);
    res.send({text: pdfResult.text});
});

app.post("/addToCSV", async (req, res) => {

    let { user, rating, details, timestamp } = req.body;

    let my_file = await readCSV();
    my_file.push({
        user,
        satisfaction_rating,
        frequency,
        recommendation_level,
        details,
        timestamp,
    });

    await s3.putObject({
        Body: JSON.stringify(my_file),
        Bucket: "cyclic-weak-pink-prawn-slip-ap-south-1",
        Key: "data.json",
    }).promise()
    res.send("Data saved");
});

app.get("/readFromCSV", async (req, res) => {
    let my_file = await readCSV();

    res.send(my_file);
});

app.post("/resetCSV", async (req, res) => {
    await s3.putObject({
        Body: JSON.stringify([]),
        Bucket: "cyclic-weak-pink-prawn-slip-ap-south-1",
        Key: "data.json",
    }).promise()
    res.send("Data saved");
});

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening to ${process.env.PORT}`);
})