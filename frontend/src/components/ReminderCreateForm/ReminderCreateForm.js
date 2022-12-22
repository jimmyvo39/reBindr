import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtFetch from "../../store/jwt";
import { createReminder, getReminder, receiveReminder } from "../../store/reminders";
import receiveErrors from "../../store/errors";
import { useParams } from "react-router-dom";
import { getInventory } from "../../store/inventories";
// import { getCurrentUser } from "../../store/session";

function ReminderCreateForm(props) {
  const dispatch = useDispatch();
  const {id} = useParams();
  const item = useSelector(getInventory(id))


  const sessionUser = useSelector((state) => state.session.user);
  const uploader = sessionUser ? sessionUser._id : null;

//   const [item, setItem] = useState(true);

  const setShowModal = props.setShowModal;

  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => setValue(e.target.value);
    return [value, onChange];
  }

  const [title, onTitleChange] = useInput("");
  const [date, onDateChange] = useInput(new Date()+960);
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
      <div className="buttonBox">
        <button onClick={closeModal} className="xButton">
          {/* <i className="fa-solid fa-x"></i> */}
          x
        </button>
      </div>
      <h1>Reminder form</h1>
      <form form onSubmit={onSubmit}>
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
        <button type="submit">Add reminder</button>
      </form>
    </>
  );
}

export default ReminderCreateForm;
