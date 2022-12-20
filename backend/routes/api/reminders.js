const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const Reminder = mongoose.model('Reminder')
const validateReminderInput = require('../../validations/reminder');
const Notification = mongoose.model('Notification')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMailer = (msg) => {      
    sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode)
          console.log(response[0].headers)
        })
        .catch((error) => {
          console.error(error)
    })
}


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

router.patch('/:id', async (req, res, next) => {
    let reminder = await Reminder.findById(req.params.id)
    if (!reminder) return res.json(null)
    reminder.title = req.body.title
    reminder.date = req.body.date
    reminder.repeat = req.body.repeat
    reminder.save()
    return res.json(reminder)
})
  
router.patch('/:id/addNotification', async (req, res, next) => {
    let reminder = await Reminder.findById(req.params.id)
    if (!reminder) return res.json(null)
    const newNotification = new Notification({ date: req.body.date })
    reminder.notifications.push(newNotification)
    reminder.save()
    const sendDate = Math.floor(new Date(`${newNotification.date}`).getTime() / 1000)

    const msg = {
        to: `${req.user.email}`, // Change to your recipient
        from: 'reBindr.emails@gmail.com', // Change to your verified sender
        subject: `${reminder.title}`,
        text: 'item info',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        send_at: `${sendDate}`
    }
    sendMailer(msg)
    return res.json(reminder)
})

router.delete('/:id/notifications/:notification_id', async (req, res, next) => {
    const reminder = await Reminder.findById(req.params.id)
    if (!reminder) return res.json(null)
    reminder.notifications.forEach(notification => {
        if (notification._id.toString() === req.params.notification_id) {
            reminder.notifications.pop(notification)
        }
    })
    reminder.save()
    return res.json(reminder)
})

router.delete('/:id', async (req, res, next) => {
    await Reminder.findByIdAndDelete(req.params.id)
    .then(() => {
        return res.redirect('/api/users/reminders')
    })
    .catch(err => {
        console.log(err);
    });
})

module.exports = router