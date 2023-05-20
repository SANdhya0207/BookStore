const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'pass word is required']
    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    }
},{
    timestamps:true
}

)
const userModel = mongoose.model("user",userSchema);

module.exports = userModel;