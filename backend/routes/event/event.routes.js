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
const { createEvent, readEvents, getEvent, updateEvent, changeEventStatus } = require('./event.controller');

class EventRouterClass {

	constructor({ passport }) {
		this.passport = passport;
	}

	routes() {

		//Return all events
		eventRouter.get('/', (req, res) => {
			readEvents()
				.then((apiResponse) => sendApiSuccessResponse(res, 'Events received', apiResponse))
				.catch((apiResponse) => sendApiErrorResponse(res, 'Error during fetch', apiResponse));
		});

		//Create new event
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

		//Update event
		eventRouter.put('/', this.passport.authenticate('jwt', { session: false }), (req, res) => {
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
				updateEvent(req.body, req.user._id)
					.then((apiResponse) => sendApiSuccessResponse(res, 'Event is updated', apiResponse))
					.catch((apiResponse) => sendApiErrorResponse(res, 'Error during event update', apiResponse));
			}
		});

		//Return event by ID
		eventRouter.get('/:id', (req, res) => {
			getEvent(req.params.id)
				.then((apiResponse) => sendApiSuccessResponse(res, 'Event received', apiResponse))
				.catch((apiResponse) => sendApiErrorResponse(res, 'Error during fetch', apiResponse));
		});

		//Change status
		eventRouter.put('/change-status', this.passport.authenticate('jwt', { session: false }), (req, res) => {
			if (typeof req.body === 'undefined' || req.body === null) {
				sendBodyError(res, 'No body data provided');
			}

			const { miss, extra, ok } = checkFields( [ 'status' ], req.body);

			if (!ok) {
				sendFieldsError(res, 'Bad fields provided', miss, extra);
			} else {
				changeEventStatus(req.body, req.user._id)
					.then((apiResponse) => sendApiSuccessResponse(res, 'Event status is updated', apiResponse))
					.catch((apiResponse) => sendApiErrorResponse(res, 'Error during event status update', apiResponse));
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
