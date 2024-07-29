const express = require("express")
const app = express()
const PORT = process.env.PORT || 3311
const cors = require("cors")
const bodyParser = require("body-parser")

const db  = require("./config/db/db")
const formCltr = require("./app/controllers/form-controller")
db()

app.use(cors())
app.use(bodyParser.json())
// app.use(express.json())

app.post('/api/v1/forms',formCltr.create)
app.get('/api/v1/forms',formCltr.read)
app.get('/api/forms/:id',formCltr.readOne)
app.put('/api/forms/:id',formCltr.update)
app.listen(()=>{
    console.log("running on Port",PORT)
})