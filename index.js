let express = require("express");
let mongoose = require("mongoose");
let app = express();
let user = require("./routes/user");
let register = require("./routes/register")
let port = process.env.PORT || 4500;
app.use(express.json);
app.use("/api/users",user); //when creating custom we have to give the initial path it will then check for the model external available
app.use("/api/register",register);

mongoose
    .connect("mongodb://localhost/kan",{useNewUrlParser=true, useUnifiedTopology = true})
    .then(()=>console.log("Database connected"))
    .catch(error => console.log(`Something went wrong ${error.message}`));




app.listen(port, ()=>console.log(`Port is working on ${port}`));