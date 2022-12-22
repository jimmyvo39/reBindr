import jwtFetch from "./jwt";

export const RECEIVE_REMINDERS = "reminders/RECEIVE_REMINDERS";
export const RECEIVE_REMINDER = "reminders/RECEIVE_REMINDER";
export const REMOVE_REMINDER = "reminders/REMOVE_REMINDER";

export const receiveReminders = (reminders) => ({type: RECEIVE_REMINDERS, reminders});
export const receiveReminder = (reminder) => ({type: RECEIVE_REMINDER, reminder});
export const removeReminder = (reminderId) => ({type: REMOVE_REMINDER, reminderId });


export const getReminder = (reminderId) => (state) => state.reminders ? state.reminders[reminderId] : null;
export const getReminders =  (state) => state.reminders ? Object.values(state.reminders) : [];



export const fetchReminders= () => async (dispatch) => {
    const res = await jwtFetch(`/api/users/reminders`);
    const data = await res.json();
    dispatch(receiveReminders(data))
}

export const fetchItemReminders= (itemId) => async (dispatch) => {
    console.log(itemId)
    const res = await jwtFetch(`/api/inventories/${itemId.id}/reminders`);
    console.log(res)
    const data = await res.json();
    console.log(data)
    dispatch(receiveReminders(data))
}

export const fetchReminder= (reminderId) => async (dispatch) => {
    const res = await jwtFetch(`/api/reminders/${reminderId}`);
    const data = await res.json();
    dispatch(receiveReminder(data.reminder))
}

export const createReminder= (reminder) => async (dispatch) => {
    const res = await jwtFetch(`/api/reminders`,{
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(reminder),
        method: "POST"
    });
    const data = await res.json();
    dispatch(receiveReminder(data));
    
}

export const updateReminder = (reminder) => async (dispatch) => {
    const res = await jwtFetch(`/api/reminders/${reminder.id}`,{
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(reminder),
        method: "PATCH"
    });
    const data = await res.json();
    dispatch(receiveReminder(data))
}

export const deleteReminder= (reminderId) => async (dispatch) => {
    debugger
    await jwtFetch(`/api/reminders/${reminderId}`,{
        method: "DELETE"
    });

    dispatch(removeReminder(reminderId))
}



const remindersReducer = (state={},action)=>{
    const newState = {...state};

    switch(action.type){
        case RECEIVE_REMINDERS:
            return {...newState,...action.reminders};
        case RECEIVE_REMINDER:
            // newState[action.reminder.id] = action.reminder;
            // return newState;
            return{
                ...state,[action.reminder.id]: action.reminder
            }
        case REMOVE_REMINDER:
            delete newState[action.reminderId];
            return newState;
        default:
            return state
    }
}

export default remindersReducer