import React, {useState} from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import './ReminderIndex.css'
import { deleteReminder } from "../../store/reminders";
import { useParams } from "react-router-dom";


const ReminderIndexItem = ({reminder}) => {
    // const itemId = useParams()
    
    const dispatch = useDispatch();
    const [reminding, setReminding] = useState(true);

    const handleDelete = (e) => {
        console.log(reminder, reminder._id)
        e.preventDefault();
        dispatch(deleteReminder(reminder._id));
        setReminding(false)
    };

    return(
        <>
        {reminding && (
            <li>
                <div className="reminder-container" >
                    <div className="reminder-details" >
                        <div>
                            {reminder.title}
                        </div>
                        <div>
                            {moment(reminder.date).format('MMMM Do YYYY, h:mm a')}
                        </div> 
                    </div>
                    <div className="button-set">
                        <button>share</button>
                        <button onClick={handleDelete} >delete</button>
                    </div>
                </div>
                
            </li>
        )}
        </>
    )

}

export default ReminderIndexItem