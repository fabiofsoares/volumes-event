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
			status: _status[0]
		};

		EventModel.create(newEvent)
			.then((mongoResponse) => resolve(mongoResponse))
			.catch((mongoResponse) => reject(mongoResponse));
	});
};

const updateEvent = (body, id) => {
    return new Promise((resolve, reject) => {
        const data = {
            date_start: body.date_start,
            date_finish: body.date_finish,
            name: body.name,
            description: body.description,
            status: _status[parseInt(body.status)]
        }
        
        EventModel.findByIdAndUpdate(id, { $set: data })
        .then(mongoResponse => resolve(mongoResponse))
        .catch(mongoResponse => reject(mongoResponse))
    })
}

const readEvents = () => {
    return new Promise( (resolve, reject) => {
        EventModel.find((error, event) => {
            if(error) reject(error)
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
    return new Promise( (resolve, reject) => {
    EventModel.findOneAndUpdate(id, {$set: { status : _status[parseInt(body.status)]}}, (error, event) => {
            if(error) reject(error)
            else {
                return resolve(event)
            }
        })
    })
}

const getEventByUser = (user) => {
    return new Promise( (resolve, reject) => {
		EventModel.find({}, { author: user, name: 1, date_start: 1, status: 1 }, (error, event) => {
            if(error) reject(error)
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
    })
}

//Export
module.exports = {
	createEvent,
	readEvents,
	getEvent,
	updateEvent,
	changeEventStatus,
	getEventByUser
};
