// Imports

const express = require('express');
const eventRouter = express.Router();

const {
	sendBodyError,
	sendFieldsError,
	sendApiSuccessResponse,
	sendApiErrorResponse
} = require('../../services/server.response');
const { checkFields } = require('../../services/request.checker');
const { createEvent, readEvents, getEvent } = require('./event.controller');

class EventRouterClass {
	constructor({ passport }) {
		this.passport = passport;
	}

	routes() {
		eventRouter.get('/', (req, res) => {
			readEvents()
				.then((apiResponse) => sendApiSuccessResponse(res, 'Events received', apiResponse))
				.catch((apiResponse) => sendApiErrorResponse(res, 'Error during fetch', apiResponse));
		});

		eventRouter.get('/:id', (req, res) => {
			getEvent(req.params.id)
				.then((apiResponse) => sendApiSuccessResponse(res, 'Event received', apiResponse))
				.catch((apiResponse) => sendApiErrorResponse(res, 'Error during fetch', apiResponse));
		});

		eventRouter.post('/', this.passport.authenticate('jwt', { session: false }), (req, res) => {
			if (typeof req.body === 'undefined' || req.body === null) {
				sendBodyError(res, 'No body data provided');
			}

			const { miss, extra, ok } = checkFields(
				[ 'date_start', 'date_finish', 'name', 'description', 'category', 'place' ],
				req.body
			);

			if (!ok) {
				sendFieldsError(res, 'Bad fields provided', miss, extra);
			} else {
				createEvent(req.body, req.user._id)
					.then((apiResponse) => sendApiSuccessResponse(res, 'Event is created', apiResponse))
					.catch((apiResponse) => sendApiErrorResponse(res, 'Error during event creation', apiResponse));
			}
		});
	}

	init() {
		this.routes();
		return eventRouter;
	}
}

// Export
module.exports = EventRouterClass;
