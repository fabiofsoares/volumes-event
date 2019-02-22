/*
Imports & configs
*/
    const mongoose = require('mongoose');
    const { Schema } = mongoose;
//


/*
Model definition
*/
    const eventSchema = new Schema({
        author: String,
        date_creation: Date,
        date_start: Date,
        date_finish: Date,
        name: String,
        description: String,
        status: String,
        category: String,
        cover: String, //Image -> il faut vérifier si c'est le bon type
        place: String
    })
//


/*
Export
*/
    const EventModel = mongoose.model('event', eventSchema);
    module.exports = EventModel;
//