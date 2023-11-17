const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const pdfUtil = require("pdf-to-text");
const crawler = require("crawler-request");
const app = express();
const options = {from: 0, to: 10};

app.get("/extractPDFText", async (req, res) => {
    const pdfResult = await crawler(req.query.url);
    res.send({text: pdfResult.text});
});

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening to ${process.env.PORT}`);
})