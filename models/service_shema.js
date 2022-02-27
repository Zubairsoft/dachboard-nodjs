const mongoose=require('mongoose')
const serviceSehema=mongoose.Schema({
    service:{type:String,},
    Image:{type:String},
    is_active:{type:Boolean,default:true}

})
module.exports=serviceSehema;