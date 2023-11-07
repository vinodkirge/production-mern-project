
import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema({
title:{
    type:String,
    required:true
},
slug:{
    type:String,
    lowercase:true
},
keys:{
    type:String
},
description:{
    type:String,
    required:true
}
,
price:{
    type:String,
    required:true
},
category:{
    type:mongoose.ObjectId,
    contentType:String,
    ref:"category"
    
},
link:{
    type :String,
    
    
    
},

photo:{
    data:Buffer,
    contentType:String
}
})
export default mongoose.model("products", serviceSchema)