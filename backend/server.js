/*
    Imports
*/
                          require('dotenv').config();
const express           = require('express');
const { mainRouter }    = require('./routes/main.router');

/*
    Variables
*/
const port = process.env.PORT;
const host = process.env.HOST;
const server = express();



/*
    Server
*/
const init = () => {
    
    server.use('/', mainRouter);

    server.listen(port, host, () => {
        console.log(`Server is running on ${host}:${port}`)
    });
};

init();
