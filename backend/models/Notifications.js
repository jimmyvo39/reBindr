const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = Schema({
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Notification', notificationSchema);