 const mongoose=require('mongoose')
 const experinceSchema=mongoose.Schema({
    exName:{type:String},
    date:{type:Date},
    is_active:{type:Boolean,default:true}
 })

module.exports=experinceSchema;