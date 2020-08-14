const express = require('express');
var cors = require('cors')
//creating the app, initialise
const app = express();

//db
require('./startup/db')();


app.use(cors())

//middleware
/**
 * @description express.join() : parses the body.
 */
app.use(express.json());




//routers
require('./startup/routes')(app);

//connection 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening On PORT: ${PORT}`));