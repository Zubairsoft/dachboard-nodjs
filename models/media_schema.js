const mongoose=require('mongoose')
const mediaSchema=mongoose.Schema({
    name:{type:String},
    link:{type:String},
    logo:{type:String},
    is_active:{type:Boolean,default:true}
})
module.exports=mediaSchema;