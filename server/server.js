//configure express server
const express = require("express");
const app = express();
//set the port to run the express server
const port = 8000;
//make sure the cross origin problem is avoided
const cors = require("cors");
app.use(cors());
//recognize incoming request objects as JSON, Strings or Arrays
app.use(express.json(), express.urlencoded({ extended: true }));
require("./config/mongoose.config");
//require all routes
const AllRoutes = require("./routes/pet.routes");
    AllRoutes(app);

app.listen(port, ()=>console.log(`Listen on port: ${port}`));