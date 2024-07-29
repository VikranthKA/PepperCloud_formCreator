const Form = require("../models/form-model")

const formCltr = {}


formCltr.create = async(req,res)=>{
    try {
        
        const form = new Form(req.body)
        await form.save()
        return res.status(201).json(form)
    } catch (error) {
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
    try {
        const form = await Form.findById(req.params.id)
        return res.status(200).json(form)
    } catch (error) {
        return res.status(500).json({
            message:"Error creating the Form",
            error:error,
        })
    }
}
formCltr.update = async(req,res)=>{
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