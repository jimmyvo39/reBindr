const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: "Inventory"
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    repeat: {
        type: String
    },
    doc_links: {
        type: Array
    }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Reminder', reminderSchema);