const mongoose=require("mongoose")
const projectSchema=mongoose.Schema({
    project_Name:{type:String},
    date:{type:Date},
    Image:{type:String},
    is_active:{type:Boolean,default:true}
    
})
module.exports=projectSchema;