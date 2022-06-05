const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userDataSchema = mongoose.Schema({
    name:{type: String, required:true,unique:true},
    idNum:{type:String, required:true, unique:true},
    organization:{type:[String],required:true},
    certNum:{type:String,required:true,unique:true},
    expDate:{type:String,required:true},
    spriteData:{type:spriteDataSchema, required:true}
});

const spriteDataSchema = mongoose.Schema({
    type:{type:String,enum:["text","image"],required:true},
    content:{type:String,required:true},
    left:{type:Number,required:true},
    top:{type:Number,required:true},
    scale:{type:Number,required:true},
    angle:{type:Number,required:true},
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("UserData",userDataSchema);