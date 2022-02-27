const mongoose=require('mongoose')
const skillSchema=mongoose.Schema(
    {
        skill:{type:String},
        is_active:{type:Boolean,default:true}
        

    }
)
module.exports=skillSchema;