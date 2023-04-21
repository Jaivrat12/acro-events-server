const mongoose = require('mongoose');
// const { Schema } = mongoose;

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        required: true,
    },
    images: {
        type: [{
            _id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }],
        default: [],
    },
});

module.exports = mongoose.model('Event', EventSchema);