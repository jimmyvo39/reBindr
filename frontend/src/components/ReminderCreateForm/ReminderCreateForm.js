import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtFetch from "../../store/jwt";
import { createReminder, getReminder, receiveReminder } from "../../store/reminders";
import receiveErrors from "../../store/errors";
import { useParams } from "react-router-dom";
import { getInventory } from "../../store/inventories";
// import { getCurrentUser } from "../../store/session";
import './ReminderCreateForm.css'
import moment, { min } from 'moment'

function ReminderCreateForm(props) {
  const dispatch = useDispatch();
  const {id} = useParams();
  const item = useSelector(getInventory(id))


  const sessionUser = useSelector((state) => state.session.user);
  const uploader = sessionUser ? sessionUser._id : null;


  const setShowModal = props.setShowModal;

  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => setValue(e.target.value);
    return [value, onChange];
  }

  const [title, setTitle] = useState("");
  const [date, setDate] = useState('');
  const [repeat, onRepeatChange] = useInput("");

  const [showTitleError, setShowTitleError] = useState(false)
  const titleError = 'Reminder title must be between 5 and 50 characters.'
  const [showDateError, setShowDateError] = useState(false)
  const dateError = 'Reminder must be in the future.'

  const twentyMinutesLater = new Date();
  twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20)
  twentyMinutesLater.setHours(twentyMinutesLater.getHours() - 5);
  const minimum = twentyMinutesLater.toISOString().split(':').slice(0,2).join(':')

  const onSubmit = (e) => {
    e.preventDefault();

    let newTwentyMinutesLater
    if (!date) {
      newTwentyMinutesLater = new Date();
      newTwentyMinutesLater.setMinutes(newTwentyMinutesLater.getMinutes() + 20);
    }
    const data = { uploader, item, title, date: date ? date : newTwentyMinutesLater, repeat };
    
    const now = moment(new Date()).format("MMMM Do YYYY, h:mm a")
    const inputDate = moment(date).format("MMMM Do YYYY, h:mm a")
    setShowTitleError(false)
    setShowDateError(false)
    
    if ((title.length < 5 || title.length > 50) && (date && inputDate < now)) {
      setShowTitleError(true)
      setShowDateError(true)
      return
    } else if (title.length < 5 || title.length > 50) {
      setShowTitleError(true)
      return
    } else if (date && inputDate < now) {
      setShowDateError(true)
      return
    }

    dispatch(createReminder(data));
    setShowModal(false);
    // setItem(false);
  };

  const [] = (useInput = "");

  const closeModal = (e) => {
    e.preventDefault();
    setShowModal(false);
    // setItem(false);
  };

//   if (!item) {
//     return null;
//   }

  return (
    <>
      <div className="form-container">
        <div className="buttonBox">
          <button onClick={closeModal} className="xButton">
            {/* <i className="fa-solid fa-x"></i> */}
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <h1>Create a reminder</h1>
        <form className="reminder-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {showTitleError &&
            <div className="errors">{titleError}</div>
          }
          <input
            type="datetime-local"
            min={minimum}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {showDateError && 
            <div className="errors">{dateError}</div>
          }
          <button type="submit"  className="create-form-btn">Add reminder</button>
        </form>

      </div>
    </>
  );
}

export default ReminderCreateForm;
