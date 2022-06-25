const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const optionalSpriteDataSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["text", "image"],
        validate: { validator: LooseString },
    },
    isSprite: { type: Boolean, validate: { validator: BooleanTrue }, required: true  },
    content: { type: String, validate: { validator: LooseString } },
    left: { type: String },
    top: { type: String },
    scaleX: { type: String },
    scaleY: { type: String },
    angle: { type: String },
});
const requiredSpriteDataSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["text", "image"],
        validate: { validator: LooseString },
    },
    isSprite: { type: Boolean, validate: { validator: BooleanTrue }, required: true  },
    content: { type: String, validate: { validator: LooseString } },
    left: { type: String },
    top: { type: String },
    scaleX: { type: String },
    scaleY: { type: String },
    angle: { type: String },
});

const requiredDataSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["text", "image", "select"],
        validate: { validator: LooseString },
    },
    isSprite: { type: Boolean, validate: { validator: BooleanFalse }, required: true  },
    content: { type: String, validate: { validator: LooseString }, required: true },
});
const optionalDataSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["text", "image"],
        validate: { validator: LooseString },
    },
    isSprite: { type: Boolean, validate: { validator: BooleanFalse }, required: true  },
    content: { type: String, validate: { validator: LooseString } },
});

const requiredUniqueSpriteDataSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["text", "image", "select"],
        validate: { validator: LooseString },
    },
    isSprite: { type: Boolean, validate: { validator: BooleanFalse }, required: true  },
    content: { type: String, validate: { validator: LooseString }, required: true , unique:true},
});

const userDataSchema = mongoose.Schema({
    name: { type: optionalSpriteDataSchema, required: true },
    idNum: { type: requiredUniqueSpriteDataSchema, required: true },
    organization: { type: optionalSpriteDataSchema, required: true },
    certNum: { type: requiredSpriteDataSchema, required: true },
    expDate: { type: optionalSpriteDataSchema, required: true },
    profileImage: { type: optionalSpriteDataSchema, required: true },

    certType: { type: requiredDataSchema, required: true },
    issuingAgency: { type: optionalDataSchema, required: true },
    createTime: { type: requiredDataSchema, required: true },
    updateTime: { type: requiredDataSchema, required: true },
    certImage: { type: requiredDataSchema, required: true },
});

function LooseString(value) {
    return typeof value === "string" ? true : false;
}

function BooleanFalse(value) {
    return value === false;
}

function BooleanTrue(value) {
    return value === true;
}
userDataSchema.plugin(uniqueValidator);
module.exports = mongoose.model("UserData", userDataSchema);
