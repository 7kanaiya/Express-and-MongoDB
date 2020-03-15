let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    firstName:{type:String ,min:4,max:100,required:true},
    lastName:{type:String, min:4, max:200, required:true},
    address:{ type:String, required:true},
    userLogin:{
        emailId:{ type: String,require:true,unique:true},
        password:{ type: String, require:true}
    }
});

let userModel = mongoose.model("userDetails",userSchema);
 module.exports = userModel;