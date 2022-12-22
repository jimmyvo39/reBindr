import React, {useState} from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import './ReminderIndex.css'
import { deleteReminder } from "../../store/reminders";
import { useParams } from "react-router-dom";
import ReminderShareFormModal from "../ReminderShareForm/ReminderShareModal";

const ReminderIndexItem = ({reminder}) => {
    // const itemId = useParams()
    
    const dispatch = useDispatch();
    const [reminding, setReminding] = useState(true);

    const handleDelete = (e) => {

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
                        {/* <button onClick={handleShare} >share</button> */}
                        <ReminderShareFormModal reminderId={reminder._id} />
                        <button onClick={handleDelete} >delete</button>
                    </div>
                </div>
                
            </li>
        )}
        </>
    )

}

export default ReminderIndexItem