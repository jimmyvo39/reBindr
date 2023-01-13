# reBindr

![logo](./frontend/public/logo-color.png)

## Background

[reBindr](http://rebindr.onrender.com/) is a web application that helps you set up and manage reminders for tasks and events. It offers a quick and easy way to create notifications, and allows you to include others in your reminders. You can also upload information and links related to your devices and tasks. With reBindr, you can stay organized and on top of the things that matter in your life.

## Technologies

* MongoDB
* Mongoose
* ExpressJS
* React-Redux
* NodeJs

* Miro for wire frames
* Figma for frontend design
* Big Calendar Library
* Twilio REST API for SMS messaging
* SendGrid Email API for email messaging

## Features

### Seamless Email/Text scheduling upon creating a reminder notification or sharing a reminder

![shareReminder](https://github.com/jimmyvo39/reBindr/blob/main/frontend/public/shareReminder.gif)

### Splash page with tutorial

* GIF of Ming's Intro before login

## Code Snippets

### Sharing a reminder notification via email and/or text

When the `/api/reminders/:reminderId/shareReminder` request gets sent to the backend, a message will be crafted using the specific reminder's information in the database. Then, depeneding on whether an email address, phone number, or both, have been included in the request body, the message will be sent to the input destination using the appropriate API.

```js
router.post('/:id/shareReminder', requireUser, async (req, res, next) => {
    const reminder = await Reminder.findById(req.params.id)
    let item = await Inventory.findById(reminder.item)

    if (!reminder || !item) return res.json(null)

    const shareEmail = req.body.email
    const shareText = req.body.phone

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
            to: shareEmail, 
            from: 'reBindr.emails@gmail.com',
            subject: reminder.title,
            text: msgBody,
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
```

### Fetching Reminders

When fetching Reminders from the database, we make sure to only fetch the reminders we need by using the nested routes through either users `api/users/reminders` or inventory items `api/inventories/:itemId/reminders`. Individual reminders have their own route through `api/reminders/:reminderId`.

```js
export const fetchReminders= () => async (dispatch) => {
    const res = await jwtFetch(`/api/users/reminders`);
    const data = await res.json();
    dispatch(receiveReminders(data))
}

export const fetchItemReminders= (item) => async (dispatch) => {    
    const res = await jwtFetch(`/api/inventories/${item.id}/reminders`);
    const data = await res.json();
    dispatch(receiveReminders(data))
}

export const fetchReminder= (reminderId) => async (dispatch) => {
    const res = await jwtFetch(`/api/reminders/${reminderId}`);
    const data = await res.json();
    dispatch(receiveReminder(data.reminder))
}
```

### Populating the calendar

We fetch the pertinent reminders from our database and deconstructing their stored data to create individual calendar events for each reminder.

```js
const reminders = useSelector(getReminders)

const remindersFormatted = reminders.map((reminder) => {
    return {
        'title': reminder.title,
        'start': new Date(reminder.date),
        'end': new Date(reminder.date)
        } ;
});
```

```js
const BigCalendar = () => {
    const dispatch= useDispatch()

    const reminders = useSelector(getReminders)

    const remindersFormatted = reminders.map((reminder) => {
        return {
            'title': reminder.title,
            'start': new Date(reminder.date),
            'end': new Date(reminder.date)
          } ;
    });

    useEffect(()=>{
        dispatch(fetchReminders())
    },[])

    const styling = {height: "500px",  
                    width: "600px",
                    // fontSize: "50%"
                    };

    return (
        <>    
            <div style={styling}>
                <Calendar

                localizer={localizer}
                events={remindersFormatted}

                startAccessor="start"
                endAccessor="end"

                step={60}
                defaultDate={new Date()}
                popup={false}
                onShowMore={(events, date) => this.setState({ showModal: true, events })}
                />
            </div>
        </>
    )
}
```
