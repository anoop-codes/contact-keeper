const express = require('express');

//creating the app, initialise
const app = express();

//body parse middleware
app.use(express.json());

//routers
app.use('/api/users', require('./routers/users'));
app.use('/api/auth', require('./routers/auth'));
app.use('/api/contacts', require('./routers/contacts'));

//connection 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening On PORT: ${PORT}`));