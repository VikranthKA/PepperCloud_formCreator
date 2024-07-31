const express = require("express")
const app = express()
const PORT = process.env.PORT || 3311
const cors = require("cors")
const bodyParser = require("body-parser")

const db  = require("./config/db/db")
const formCltr = require("./app/controllers/form-controller")
db()
const {checkSchema} = require('express-validator')
const { validateForm, validateRequest } = require("./app/validations/formValidation")
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

app.post('/api/v1/forms',validateForm,validateRequest,formCltr.create)
app.get('/api/v1/forms',formCltr.read)
app.get('/api/v1/forms/:id',formCltr.readOne)
app.put('/api/v1/forms/:id',validateForm,validateRequest,formCltr.update)

app.listen(PORT,()=>{
    console.log("running on Port",PORT)
})