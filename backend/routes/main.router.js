/*
 Imports
*/
const { Router }            = require('express');
const UserRouterClass       = require('./user/user.routes');


/*
Define routers
*/
    // Parent
    const mainRouter        = Router({ mergeParams: true });
    const apiRouter         = Router({ mergeParams: true });

    // Child
    const userRouter        = new UserRouterClass();


/*
    Routes
*/
    mainRouter.use('/api', apiRouter);
    apiRouter.use('/user', userRouter.init());




    module.exports = { mainRouter };

