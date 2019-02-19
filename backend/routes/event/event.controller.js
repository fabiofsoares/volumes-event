// Imports
const EventModel    = require('../../models/event.model')
const UserModel     = require('../../models/user.model')


//Methods
const createEvent = (body, userId) => {
    return new Promise((resolve, reject) => {
        const newEvent = {
            author: userId,
            date_creation: new Date(),
            date_start: body.date_start,
            date_finish: body.date_finish,
            name: body.name,
            description: body.description
        }

        EventModel.create(newEvent)
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

                ((async function loop(){
                    for(let i = 0; i < event.length; i++){
                        eventArray.push(event[i])
                    }
                    return resolve(eventArray)
                })());
            }
        })
    })
}

//Export
module.exports = {
    createEvent,
    readEvents
}