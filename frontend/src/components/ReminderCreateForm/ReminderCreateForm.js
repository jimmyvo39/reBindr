import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtFetch from "../../store/jwt";
import { createReminder, getReminder, receiveReminder } from "../../store/reminders";
import receiveErrors from "../../store/errors";
import { useParams } from "react-router-dom";
import { getInventory } from "../../store/inventories";
// import { getCurrentUser } from "../../store/session";
import './ReminderCreateForm.css'

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

  const [title, onTitleChange] = useInput("");
  const [date, onDateChange] = useInput(new Date());
  const [repeat, onRepeatChange] = useInput("");


  const onSubmit = (e) => {
    e.preventDefault();
    const data = { uploader, item, title, date, repeat };
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
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <h1>Create a reminder</h1>
        <form className="reminder-form" form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={onTitleChange}
          />
          <input
            type="datetime-local"
            value={date}
            onChange={onDateChange}
          />
          <button type="submit"  className="create-form-btn">Add reminder</button>
        </form>

      </div>
    </>
  );
}

export default ReminderCreateForm;
