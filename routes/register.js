let express = require("express");
let joi = require("@hapi/joi");
let model = require("../db/register");
let router = express.Router();

//All fetch
router.get("/allregistered", async (req,res)=>{
    let register  = await model.find();
    res.send({data:register});
});

//Fetch by id
router.get("/registered/:id",async (req,res)=>{
    let register = await model.findById(req.params.id);
    if(!register){return res.status(404).send({message:"Invalid ID"})};
    res.send({data:register});
})

//register new 
router.post("/newregister",async(req,res)=>{
    let {error} = validationError(res.body);
    if(error){return res.send(error.details[0].message)};
    let newData = new model({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        gender: req.body.gender,
        userLogin: req.body.userLogin
    });
    let data = await newData.save();
    res.send({message:"Thank you",d:data} );
});

function validationError(error){
    let schema = joi.object({
        firstName:joi.string().min(4).max(100).required(),
        lastName: joi.string().min(4).max(200).required(),
        address: {
            country: joi.string().required(),
            city: joi.string().required(),
            state: joi.string().required()
        },
        gender: joi.string().required(),
        userLogin:{
            emailId: joi.string().required(),
            password: joi.string().required()
        }
    });
    return schema.validate(error);
}

//Update register

router.put("/registered/updateuser/:id",async (req,res)=>{
    let register = await model.findById(req.params.id);
    if(!register){
        req.send(404).send({message:"Invalid id"});
    }
    let {error} = validationError(req.body);
    if(error){return res.send(error.details[0].message)};
    register.firstName = req.body.firstName;
    register.lastName = req.body.lastName;
    await register.save();
    res.send({message:"User data updated"});
});

//Remove registered

router.delete("/registered/removeuser/:id",async (req,res)=>{
    let register = await model.findByIdAndRemove(req.params.id);
    if(!register){
        res.send(404).send({message:"Invalid id"});
    }
    res.send({message:"User data deleted"});
});



module.exports= router;

