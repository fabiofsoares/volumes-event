// Imports
const EventModel = require('../../models/event.model');
const UserModel = require('../../models/user.model');

//Event status
const _status = [ 'waiting', 'approuved', 'refused', 'canceled', 'deleted' ];

//Methods
const createEvent = (body, userId) => {
	return new Promise((resolve, reject) => {
		const newEvent = {
			author: userId,
			date_creation: new Date(),
			date_start: body.date_start,
			date_finish: body.date_finish,
			name: body.name,
			description: body.description,
			status: _status[1]
		};

		EventModel.create(newEvent)
			.then((mongoResponse) => resolve(mongoResponse))
			.catch((mongoResponse) => reject(mongoResponse));
	});
};

const updateEvent = (body, id) => {
	return new Promise((resolve, reject) => {
		const updateEvent = {
			date_start: body.date_start,
			date_finish: body.date_finish,
			name: body.name,
			description: body.description,
			status: _status[body.status]
		};

		EventModel.findByIdAndUpdate(id, { $set: { updateEvent } })
			.then((mongoResponse) => resolve(mongoResponse))
			.catch((mongoResponse) => reject(mongoResponse));
	});
};

const readEvents = () => {
	return new Promise((resolve, reject) => {
		EventModel.find((error, event) => {
			if (error) reject(error);
			else {
				let eventArray = [];

				(async function loop() {
					for (let i = 0; i < event.length; i++) {
						eventArray.push(event[i]);
					}
					return resolve(eventArray);
				})();
			}
		});
	});
};

const getEvent = (id) => {
	return new Promise((resolve, reject) => {
		EventModel.findById(id, (error, event) => {
			if (error) reject(error);
			else {
				return resolve(event);
			}
		});
	});
};

const changeEventStatus = (body, id) => {
	return new Promise((resolve, reject) => {
		EventModel.findOneAndUpdate(id, { $set: { status: _status[body.status] } }, (error, event) => {
			if (error) reject(error);
			else {
				return resolve(event);
			}
		});
	});
};

//Export
module.exports = {
	createEvent,
	readEvents,
	getEvent,
	updateEvent,
	changeEventStatus
};
