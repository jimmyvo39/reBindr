import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import "./ReminderIndex.css";
import { deleteReminder } from "../../store/reminders";
import { useParams } from "react-router-dom";
import ReminderShareFormModal from "../ReminderShareForm/ReminderShareModal";

const ReminderIndexItem = ({ reminder }) => {
  // const itemId = useParams()

  const dispatch = useDispatch();
  const [reminding, setReminding] = useState(true);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReminder(reminder._id));
    setReminding(false);
  };

  return (
    <>
      {reminding && (
        <li className="reminder-container">
          <div>
            <h4 id="remind-title">{reminder.title}</h4>
            <h5 id="remind-date">
              {moment(reminder.date).format("MMMM Do YYYY, h:mm a")}
            </h5>
          </div>

          <div className="button-set">
            <ReminderShareFormModal reminderId={reminder._id} />

            <button className="delete-reminder-btn" onClick={handleDelete}>
              <i class="fa-solid fa-trash fa-2x"></i>
            </button>
          </div>
        </li>
      )}
    </>
  );
};

export default ReminderIndexItem;
