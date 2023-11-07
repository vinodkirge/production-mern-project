import fs from "fs"
import serviceModel from "../models/serviceModel.js"
import slugify from "slugify"

export const createProductController = async(req,res)=>{
try {
    const {title,description,price,keys,category,link} = req.fields
    const {photo} = req.files
    if(!title){
        res.status(500).send({message:"title is required"})
    }
    if(!description){
        res.status(500).send({message:"title is required"})
    }
    if(!price){
        res.status(500).send({message:"title is required"})
    }
    if(!category){
        res.status(500).send({message:"category is required"})
    }
    if(!keys){
        res.status(500).send({message:"keys is required"})
    }
    
    
    if(!link){
        res.status(500).send({message:"title is required"})
    }
    if(!photo){
        res.status(500).send({message:"title is required"})
    }

    const products = new serviceModel({...req.fields , slug:slugify(title)})
    if(photo){
        products.photo.data = fs.readFileSync(photo.path)
        products.photo.contentType = photo.type
    }
    
    await products.save();
    res.status(200).send({
        success:true,
        message:"product created successfully",
        products
    })
    
} catch (error) {
    res.status(500).send({
        success:"false",
        message:"error while creatoing product",
        error
    })
}
}
export const getProductController=async(req,res)=>{
    try {
        const product = await serviceModel.find({}
            ).select("-photo").limit(50).populate("category")
            res.status(200).send({
                success:true,
                message:"product get successfully",
                product
            })
    } catch (error) {
        console.log(error)
    }
}

export const photoController=async(req,res)=>{
    try {
        const product = await serviceModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set("Content-type",product.photo.contentType)
        }
       return res.status(200).send(product.photo.data)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            messsage:"error in getting pic"
        })
    }
}


export const searchController=async(req,res)=>{
try {
    const {keyword} = req.params
    const results = await serviceModel.find({
        $or :[
             {title:{$regex:keyword , $options:"i"}},
             {description:{$regex:keyword , $options:"i"}},
             {keys:{$regex:keyword , $options:"i"}}
        ]
    })
    res.json(results)
} catch (error) {
    console.log(error)
}
}