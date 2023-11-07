import slugify from "slugify"
import categoryModel from "../models/categoryModel"

export const categoryController= async(req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            res.status(500).send({message:"name is required"})
        }
        const category = await new categoryModel({name , slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:"category is created",
            category
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            error,
            message:"error while creating category"
        })
    }
}

export const getCategoryController =async(req,res)=>{
try {
    const category = await categoryModel.find({});
       res.status(200).send({
        success:true,
        message:"getting category successfull",
        category
       })
} catch (error) {
    res.status(400).send({
        success:false,
        error,
        message:"error while getting category"
    })
}
}