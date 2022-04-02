const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/pets_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("Connection to db OK!"))
.catch(err=>console.log("Connection to db Failed!", err));