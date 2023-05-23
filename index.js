const express = require("express")
const dotenv = require('dotenv').config()
const bodyparser = require('body-parser')
const app = express()
const mongoose = require("mongoose")
const PORT = process.env.PORT || 8080

app.use(bodyparser.json())
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
    console.log("Successfully connected to Database");
})
mongoose.connection.on("error", () => {
    console.log("Error while connecting to Database");
})
app.use(require('./routes/auth'))
app.use(require('./routes/contact'))
app.listen(PORT, () => {
    console.log("App is running on ", PORT);
})

