//Here each files are a single middleware that has to be used in index.js via app.use()
let express = require("express");
let joi = require("@hapi/joi");
let model = require("../db/user"); 
let router = express.Router(); //To access the method of this file from any other files we need router.

//Fetch the data

router.get("/allusers", async (req,res)=>{
    let users = await model.find();
    res.send({data: users}); //or users simply
});

//Find the data

router.get("/user/:id", async(req,res)=>{
    let user = await model.findById(req.params.id);
    if(!user){return res.status(404).send({message:"Invalid Id"})};
    res.send({data: user}); //or user

});

//create the user 

router.post("/user/newuser", async (req,res)=>{
    let {error} = validationError(req.body);
    if(error){return res.send(error.details[0].message)};
    let newData = new model({ //we crate an instance of model tht we name in mongo so here also we are creating new instance of model
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        userLogin: req.body.userLogin //when there is nested data request only the parent one only no need to request child
    });
    let data =await newData.save();
    res.send({message:"Thank you",d:data} );
});

function validationError(error){
    let schema = joi.object({
        firstName:joi.string().min(4).max(100).required(),
        lastName: joi.string().min(4).max(200).required(),
        address: joi.string().required(),
        userLogin:{
            emailId: joi.string().required(),
            password: joi.string().required()
        }
    });
    return schema.validate(error);
}

//Update user

router.put("/user/updateuser/:id",async (req,res)=>{
    let user = await model.findById(req.params.id);
    if(!user){
        res.send(404).send({message:"Invalid id"});
    }
    let {error} = validationError(req.body);
    if(error){return res.send(error.details[0].message)};
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    await user.save();
    res.send({message:"User data updated"});
});

//Remove user

router.delete("/user/removeuser/:id",async (req,res)=>{
    let user = await model.findByIdAndRemove(req.params.id);
    if(!user){
        res.send(404).send({message:"Invalid id"});
    }
    res.send({message:"User data deleted"});
});




module.exports = router;