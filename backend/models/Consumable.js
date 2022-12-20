const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consumableSchema = Schema({
    consumable_name: {
        type: String,
        required: true
    },
    link: {
        type: String
    }
})

module.exports = mongoose.model('Consumable', consumableSchema);