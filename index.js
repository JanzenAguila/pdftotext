const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const crawler = require("crawler-request");
const bodyParser = require("body-parser");
const app = express();
const options = {from: 0, to: 10};

app.use(bodyParser.json());

app.post("/extractPDFText", async (req, res) => {
    const pdfResult = await crawler(req.body.url);
    res.send({text: pdfResult.text});
});

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening to ${process.env.PORT}`);
})