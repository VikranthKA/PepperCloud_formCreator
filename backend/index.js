const express = require("express")
const app = express()
const PORT = 3311

const db  = require("./config/db/db")
db()

app.listen(()=>{
    console.log("running on Port",PORT)
})