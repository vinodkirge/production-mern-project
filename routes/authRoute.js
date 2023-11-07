import express from "express"
import { loginController, registerController } from "../controllers/registerController";
import { requireSignIn } from "../middlewears/authMiddlewear";

const router = express.Router()

router.post('/register' , registerController)
router.post("/login",loginController)
router.get ("/user-auth" , requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})
router.get ("/admin-auth" , requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})
export default router;