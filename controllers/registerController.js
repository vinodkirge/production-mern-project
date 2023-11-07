import { comparePassword, hashPassword } from "../helpers/authhelper"
import UserModel from "../models/UserModel"
import JWT from "jsonwebtoken"

export const registerController= async(req,res)=>{
try {
    const {name,password,email,phone} = req.body
    if(!name){
        return res.status(400).send({message:"name is required"})
    }
    if(!password){
        return res.status(400).send({message:"password is required"})
    }
    if(!email){
        return res.status(400).send({message:"email is required"})
    }
    if(!phone){
        return res.status(400).send({message:"phone is required"})
    }

    const existingUser = await UserModel.findOne({email})
    if(existingUser){
        return res.status(404).send({
            success:false,
            message:"already register please login"
        })
    }
    
    const hashedPassword = await hashPassword(password)

    const user = await new UserModel({name,phone,email,password:hashedPassword}).save()
    res.status(200).send({
        success:true,
        message:"user register successfully",
       user
    })
} catch (error) {
    res.status(400).send({
        success:false,
        message:"error in register"
    })
}

}

export const loginController = async(req,res)=>{
    try {
        
        const {email,password} = req.body
        if(!email || !password){
            res.status(400).send({
                success:false,
                message:"invalid email or password"
            })
        }
        const user = await UserModel.findOne({email})
        if(!user){
           return res.status(400).send({
                success:false,
                message:"user not register"
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
           return res.status(400).send({
                message:"please enter valid password"
            })
        }
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET ,{expiresIn:"20d"})
        res.status(201).send({
            success:true,
            message:"user login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role
            },
            token

        })
    } catch (error) {
       res.status(400).send({
        success:false,
        message:'error while login'
       }) 
    }
}