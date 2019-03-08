/*
 Imports
*/
const { Router } = require('express');
const UserRouterClass = require('./user/user.routes');
const EventRouterClass = require('./event/event.routes');

const passport = require('passport');
const { setAuthentication } = require('../services/authentication');
setAuthentication(passport);

/*
Define routers
*/
// Parent
const mainRouter = Router({ mergeParams: true });
const apiRouter = Router({ mergeParams: true });

// Child
const userRouter = new UserRouterClass();
const eventRouter = new EventRouterClass({ passport });

/*
    Routes
*/
mainRouter.use('/api', apiRouter);
apiRouter.use('/user', userRouter.init());
apiRouter.use('/events', eventRouter.init());

mainRouter.get('/', function(req, res) {
	res.send('Welcome to Volumes Events');
});

module.exports = { mainRouter };
