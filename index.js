const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening to ${process.env.PORT}`);
})