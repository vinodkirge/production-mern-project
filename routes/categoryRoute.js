import express from "express"
import { categoryController, getCategoryController } from "../controllers/categoryControlle";

const router = express.Router();

router.post("/create-category" , categoryController)
router.get("/get-category",getCategoryController )
export default router;