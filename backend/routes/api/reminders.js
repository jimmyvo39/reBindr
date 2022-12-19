const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const Reminder = mongoose.model('Reminder')
const validateReminderInput = require('../../validations/reminder');

router.get('/:id', async (req, res, next) => {
    try {
        const reminder = await Reminder.findById(req.params.id)
                               .populate("item", "id, name");
        return res.json(reminder);
    }
    catch(err) {
        const error = new Error('Reminder not found');
        error.statusCode = 404;
        error.errors = { message: "No reminder found with that id" };
        return next(error);
    }
})

router.post('/', requireUser, validateReminderInput, async (req, res, next) => {
    try {
      const newReminder = new Reminder({
        title: req.body.title,
        uploader: req.user._id,
        item: req.body.item,
        date: Date.parse(req.body.date),
        repeat: req.body.repeat,
        doc_links: req.body.doc_links
      });
      console.log(newReminder)
  
      let reminder = await newReminder.save();
      reminder = await reminder.populate('item', '_id, name');
      return res.json(reminder);
    }
    catch(err) {
      next(err);
    }
});

module.exports = router