const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    FullName:{type:String,required:true},
    marketDes:{type:String},
    discription:{type:String,require:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    cv:{type:String},
    image:{type:String},
    is_active:{type:Boolean,default:true},

    service:[{type:mongoose.Schema.Types.ObjectId,
    ref:"service"
    }],

    skill:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"skill"
    }],

    project:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"

    }],

    experince:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "experince"
    }],
    media:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"media"
    }]

})

module.exports=userSchema;