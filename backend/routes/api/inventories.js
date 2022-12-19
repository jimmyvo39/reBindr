const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Inventory = mongoose.model('Inventory')
const validateInventoryInput = require('../../validations/inventoryItems')
const { requireUser } = require('../../config/passport');

router.get('/', async (req, res) => {
    try {
        const inventories = await Inventory.find()
                                  .populate("uploader", "_id, username")
                                  .sort({ createdAt: -1 });
        return res.json(inventories);
    }
    catch(err) {
        return res.json([]);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const item = await Inventory.findById(req.params.id)
                               .populate("uploader", "id, username");
        return res.json(item);
    }
    catch(err) {
        const error = new Error('Inventory item not found');
        error.statusCode = 404;
        error.errors = { message: "No inventory item found with that id" };
        return next(error);
    }
})

router.post('/', requireUser, validateInventoryInput, async (req, res, next) => {
    try {
      const newItem = new Inventory({
        name: req.body.name,
        uploader: req.user._id,
        model: req.body.model,
        user_manual: req.body.user_manual,
        notes: req.body.notes
      });
      console.log(newItem)
  
      let item = await newItem.save();
      item = await item.populate('uploader', '_id, username');
      return res.json(item);
    }
    catch(err) {
      next(err);
    }
});

module.exports = router