//Here each files are a single middleware that has to be used in index.js via app.use()
let express = require("express");
let router = express.Router(); //To access the method of this file from any other files we need router.

//Fetch the data

router.get("/allusers",(req,res)=>{

});

module.exports = router;