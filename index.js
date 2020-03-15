let express = require("express");
let app = express();
let user = require("./routes/user");
let port = process.env.PORT || 4500;
app.use(express.json);
app.use("/api/users",user); //when creating custom we have to give the initial path it will then check for the model external available





app.listen(port, ()=>console.log(`Port is working on ${port}`));