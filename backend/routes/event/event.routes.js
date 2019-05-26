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

const {
	createEvent,
	readEvents,
	getEvent,
	updateEvent,
	changeEventStatus,
	deleteEvent,
	getEventByUser
} = require('./event.controller');

class EventRouterClass {
	constructor({ passport }) {
		this.passport = passport;
	}

	routes() {
		//Return all events
		eventRouter.get('/', (req, res) => {
			readEvents()
				// .then((apiResponse) => sendApiSuccessResponse(res, 'Events received', apiResponse))
				.then((apiResponse) => sendApiSuccessResponse(res, apiResponse))
				.catch((apiResponse) => sendApiErrorResponse(res, 'Error during fetch', apiResponse));
		});

		//Create new event
		//eventRouter.post('/event', this.passport.authenticate('jwt', { session: false }), (req, res) => {
		eventRouter.post('/event', (req, res) => {
			if (typeof req.body === 'undefined' || req.body === null) {
				sendBodyError(res, 'No body data provided');
			}

			const { miss, extra, ok } = checkFields(
				[ 'date_start', 'date_finish', 'name', 'description', 'category', 'place', 'phone', 'mail', 'status' ],
				req.body
			);

			if (!ok) {
				sendFieldsError(res, 'Bad fields provided', miss, extra);
			} else {
				//createEvent(req.body, req.user._id)
				createEvent(req.body, '5c715755efe7bc1a60d3a57f')
					// .then((apiResponse) => sendApiSuccessResponse(res, 'Event is created', apiResponse))
					.then((apiResponse) => sendApiSuccessResponse(res, apiResponse))
					.catch((apiResponse) => sendApiErrorResponse(res, 'Error during event creation', apiResponse));
			}
		});

		//Update event
		eventRouter.put('/event/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
			if (typeof req.body === 'undefined' || req.body === null) {
				sendBodyError(res, 'No body data provided');
			}

			const { miss, extra, ok } = checkFields(
				[ 'status', 'date_start', 'date_finish', 'name', 'description', 'category', 'place' ],
				req.body
			);

			if (!ok) {
				sendFieldsError(res, 'Bad fields provided', miss, extra);
			} else {
				updateEvent(req.body, req.params.id)
					.then((apiResponse) => sendApiSuccessResponse(res, 'Event is updated', apiResponse))
					.catch((apiResponse) => sendApiErrorResponse(res, 'Error during event update', apiResponse));
			}
		});

		//Return all informations of the event by ID
		eventRouter.get('/event/:id', (req, res) => {
			getEvent(req.params.id)
				// .then((apiResponse) => sendApiSuccessResponse(res, 'Event received', apiResponse))
				.then((apiResponse) => sendApiSuccessResponse(res, apiResponse))
				.catch((apiResponse) => sendApiErrorResponse(res, 'Error during fetch', apiResponse));
		});

		//Change status
		// eventRouter.put('/change-status/:id', this.passport.authenticate('jwt', { session: false }), (req, res) => {
		eventRouter.put('/change-status/:id', (req, res) => {
			if (typeof req.body === 'undefined' || req.body === null) {
				sendBodyError(res, 'No body data provided');
			}

			const { miss, extra, ok } = checkFields(
				[ 'date_start', 'date_finish', 'name', 'description', 'category', 'place', 'phone', 'mail', 'status' ],
				req.body
			);

			if (!ok) {
				sendFieldsError(res, 'Bad fields provided', miss, extra);
			} else {
				changeEventStatus(req.body, req.params.id)
					.then((apiResponse) => {
						// console.log('apiResponse :', apiResponse);
						sendApiSuccessResponse(res, 'Event updated', apiResponse);
					})
					.catch((apiResponse) => sendApiErrorResponse(res, 'Error during event status update', apiResponse));
			}
		});

		eventRouter.delete('/event/:id', (req, res) => {
			if (!req.params || !req.params.id) {
				sendBodyError(res, 'No param provided');
			}

			deleteEvent(req.params.id)
				// .then((apiRes) => sendApiSuccessResponse(res, 'Event is deleted', apiRes))
				.then((apiRes) => sendApiSuccessResponse(res, apiRes))
				.catch((apiErr) => sendApiErrorResponse(res, 'Error during deletion', apiErr));
		});

		//Get { event name, start date, status } all events by user_ID
		eventRouter.get('/user/:eventId', (req, res) => {
			getEventByUser(req.params.eventId)
				// .then((apiResponse) => sendApiSuccessResponse(res, 'All events by user_ID received', apiResponse))
				.then((apiResponse) => sendApiSuccessResponse(res, apiResponse))
				.catch((apiResponse) => sendApiErrorResponse(res, 'Error during fetch', apiResponse));
		});
	}

	init() {
		this.routes();
		return eventRouter;
	}
}

// Export
module.exports = EventRouterClass;
