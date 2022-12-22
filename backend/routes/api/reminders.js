const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const Reminder = mongoose.model('Reminder')
const Inventory = mongoose.model('Inventory')
const Notification = mongoose.model('Notification')
const validateReminderInput = require('../../validations/reminder');

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs


const sendMailer = (msg) => {
    const sgMail = require('@sendgrid/mail')
    const sendgridAPI = process.env.SG_API_KEY
    sgMail.setApiKey(sendgridAPI)
    
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

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messageSid = process.env.TWILIO_MESSAGE_SID
const client = require('twilio')(accountSid, authToken);

const sendText = (msg) => {
    client.messages
        .create(msg)
        .then(message => console.log(message.sid));
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
        const notification = new Notification ({
            date: newReminder.date
        })
        newReminder.notifications.push(notification)
        
        let reminder = await newReminder.save();
        reminder = await reminder.populate('item', '_id, name');
        const item = await Inventory.findById(reminder.item)

        const sendDate = parseInt(Math.floor(new Date(`${notification.date}`).getTime() / 1000))
        const msgBody = 
        `   
            Hey ${req.user.username}!
            This is a reBindr reminder to ${reminder.title} for your ${item.name} is due!  
            ${item.model ? 'Model #: ' + item.model + '.' : ''} 
            ${item.notes ? 'Notes: ' + item.notes + '.' : ''} 
            ${item.user_manual ? 'User Manual: ' + item.user_manual + '.' : ''} 
            ${item.consumables.map(consumable => consumable.consumable_name + ': ' + consumable.link)} 
        }`
        
        const emailMsg = {
            to: req.user.email, // Change to your recipient
            from: 'reBindr.emails@gmail.com', // Change to your verified sender
            subject: reminder.title,
            text: msgBody,
            send_at: sendDate
        }
        sendMailer(emailMsg)

        const textMsg = {
            messagingServiceSid: messageSid,
            body: msgBody,
            to: req.user.phone,
            from: '218-522-9665 ',
        }
        sendText(textMsg)

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
  
router.patch('/:id/addNotification', requireUser, async (req, res, next) => {
    let reminder = await Reminder.findById(req.params.id)
    let item = await Inventory.findById(reminder.item)

    if (!reminder || !item) return res.json(null)
    const newNotification = new Notification({ date: req.body.date })
    reminder.notifications.push(newNotification)
    reminder.save()

    const sendDate = parseInt(Math.floor(new Date(`${newNotification.date}`).getTime() / 1000))
    const msgBody = 
    `   
        Hey ${req.user.username}!
        This is a reBindr reminder to ${reminder.title} for your ${item.name}. This is due ${reminder.date}!  
        ${item.model ? 'Model #: ' + item.model + '.' : ''} 
        ${item.notes ? 'Notes: ' + item.notes + '.' : ''} 
        ${item.user_manual ? 'User Manual: ' + item.user_manual + '.' : ''} 
        ${item.consumables.map(consumable => consumable.consumable_name + ': ' + consumable.link)} 
    }`
    
    const emailMsg = {
        to: req.user.email, // Change to your recipient
        from: 'reBindr.emails@gmail.com', // Change to your verified sender
        subject: reminder.title,
        text: msgBody,
        send_at: sendDate
    }
    // console.log(emailMsg)
    sendMailer(emailMsg)
    const textTime = new Date(`${newNotification.date}`).toISOString()
    // const textTime = new Date('2022/12/22/12:15:00').toISOString()
    console.log(textTime)

    const textMsg = {
        messagingServiceSid: messageSid,
        body: msgBody,
        to: req.user.phone,
        from: '218-522-9665 ',
        scheduleType: 'fixed',
        sendAt: textTime
    }
    sendText(textMsg)
    
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

router.post('/:id/shareReminder', requireUser, async (req, res, next) => {
    const reminder = await Reminder.findById(req.params.id)
    reminder = await reminder.populate('item', '_id, name');
    let item = await Inventory.findById(reminder.item)
    

    if (!reminder || !item) return res.json(null)

    const shareEmail = req.body.email
    const shareText = req.body.text

    const sendDate = parseInt(Math.floor(new Date(`${reminder.date}`).getTime() / 1000))
    const msgBody = 
    `   
        Hey ${req.user.username}!
        This is a reBindr reminder to ${reminder.title} for your ${item.name}. This is due ${reminder.date}!  
        ${item.model ? 'Model #: ' + item.model + '.' : ''} 
        ${item.notes ? 'Notes: ' + item.notes + '.' : ''} 
        ${item.user_manual ? 'User Manual: ' + item.user_manual + '.' : ''} 
        ${item.consumables.map(consumable => consumable.consumable_name + ': ' + consumable.link)} 
    }`
    if (shareEmail) {
        const emailMsg = {
            to: shareEmail, // Change to your recipient
            from: 'reBindr.emails@gmail.com', // Change to your verified sender
            subject: reminder.title,
            text: msgBody,
            send_at: sendDate
        }      
        sendMailer(emailMsg)    
    }
    
    if (shareText) {
        const textMsg = {
            messagingServiceSid: messageSid,
            body: msgBody,
            to: shareText,
            from: '218-522-9665 ',
        }
        sendText(textMsg)
    }
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