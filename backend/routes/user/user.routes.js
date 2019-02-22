const express = require('express');
const userRouter = express.Router({ mergeParams: true });
const { register, login, read } = require('./user.controller');
const {
	sendBodyError,
	sendFieldsError,
	sendApiSuccessResponse,
	sendApiErrorResponse
} = require('../../services/server.response');
const { checkFields } = require('../../services/request.checker');

class UserRouterClass {
	routes() {
		userRouter.get('/', (req, res) => {
			res.json('HATEOAS for auth');
		});

		// Register
		userRouter.post('/register', (req, res) => {
			// Error: no body present
			if (typeof req.body === 'undefined' || req.body === null) {
				sendBodyError(res, 'No body data provided');
			}
			// Check fields in the body
			const { miss, extra, ok } = checkFields([ 'email', 'password', 'first_name', 'last_name' ], req.body);
			//=> Error: bad fields provided
			if (!ok) {
				sendFieldsError(res, 'Bad fields provided', miss, extra);
			} else {
				//=> Request is valid: use controller
				register(req.body, res)
					.then((apiResponse) => sendApiSuccessResponse(res, 'User is registrated', apiResponse))
					.catch((apiResponse) => sendApiErrorResponse(res, 'Error during user registration', apiResponse));
			}
		});

		// Login
		userRouter.post('/login', (req, res) => {
			// Error: no body present
			if (typeof req.body === 'undefined' || req.body === null) {
				sendBodyError(res, 'No body data provided');
			}
			// Check fields in the body
			const { miss, extra, ok } = checkFields([ 'email', 'password' ], req.body);
			//=> Error: bad fields provided
			if (!ok) {
				sendFieldsError(res, 'Bad fields provided', miss, extra);
			} else {
				//=> Request is valid: use controller
				login(req.body, req, res)
					.then((apiResponse) => sendApiSuccessResponse(res, 'User is logged', apiResponse))
					.catch((apiResponse) => sendApiErrorResponse(res, 'Error during user login', apiResponse));
			}
		});

		//Read
		userRouter.get('/me', (req, res) => {
			req.cookies['VolumesToken'];

			read(req.body)
				.then((apiResponse) => sendApiSuccessResponse(res, 'User is logged', apiResponse))
				.catch((apiResponse) => sendApiErrorResponse(res, 'Error during user login', apiResponse));
		});
	}

	init() {
		this.routes();
		return userRouter;
	}
}

module.exports = UserRouterClass;
