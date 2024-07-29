const mongoose = require("mongoose")
const formSchema = new mongoose.Schema({
    title:String,
    inputs:Array
})

const Form = mongoose.model("Form",formSchema);

module.exports = Form 