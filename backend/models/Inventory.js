const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = Schema({
    uploader: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    model: {
      type: String
    },
    notes: {
      type: Text
    },
    user_manual: {
      type: String
    },
    consumables: []
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Inventory', inventorySchema);