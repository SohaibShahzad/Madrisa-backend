const ConnectToMongo = require('./config/db');
const express = require('express');
const cors = require('cors');

ConnectToMongo();

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})