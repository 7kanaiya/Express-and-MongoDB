let mongoose = require("mongoose");

let registerSchema = new mongoose.Schema({
    firstName:{type:String, min:4,max:100,required:true},
    lastName:{type:String,min:4,max:200,required:true},
    address:{
        country:{type:String, required:true},
        city:{type:String,required:true},
        state:{type:String,required:true}
    },
    gender:{type:String,required:true},
    userLogin:{
        emailId:{type:String,required:true,unique:true},
        password:{type:String,required:true}
    }
});

let userModel = mongoose.model("register",registerSchema);

module.exports = userModel;
