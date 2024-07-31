const Form = require("../models/form-model")
const { validationResult } = require("express-validator")

const formCltr = {}


formCltr.create = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    try {
        console.log(req.body,"create")
        const form = new Form(req.body)
        await form.save()
        return res.status(201).json(form)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Error creating the Form",
            error:error,
        })
    }
}
formCltr.read = async(req,res)=>{
    try {
        const forms = await Form.find();
        return res.status(200).json(forms)
        
    } catch (error) {
        return res.status(500).json({
            message:"Error creating the Form",
            error:error,
        })
    }
}
formCltr.readOne = async(req,res)=>{
    console.log(req.params.id,"id")

    try {
        let form
        if(req.params.id) form = await Form.findById({_id:req.params.id})
            else return res.json("Id missing")
        return res.status(200).json(form)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Error creating the Form",
            error:error,
        })
    }
}
formCltr.update = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    try {
        const form = await Form.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(201).json(form)
    } catch (error) {
        return res.status(500).json({
            message:"Error creating the Form",
            error:error,
        })
    }
}


module.exports = formCltr