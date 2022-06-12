const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const spriteDataSchema = mongoose.Schema({
    type: { type: String, enum: ["text", "image", "select"], validate:{validator:LooseString}},
    content: { type: String, validate:{validator:LooseString}},
    left: { type: String,},
    top: { type: String,},
    scaleX: { type: String,},
    scaleY: { type: String,},
    angle: { type: String,},
})
const userDataSchema = mongoose.Schema({
    name: { type: spriteDataSchema, required: true },
    idNum: { type: spriteDataSchema, required: true, },
    organization: { type: spriteDataSchema, required: true },
    certNum: { type: spriteDataSchema, required: true },
    expDate: { type: spriteDataSchema, required: true },
    certType: { type: spriteDataSchema, required: true },
    issuingAgency: { type: spriteDataSchema, required: true },
    profileImage: { type: spriteDataSchema, required: true },
    createTime:{type:Date, required:true},
    updateTime: {type:Date,required: true}
});

function LooseString (value) {
    return typeof value === 'string'? true : false
}




//userDataSchema.plugin(uniqueValidator);
module.exports = mongoose.model("UserData", userDataSchema);