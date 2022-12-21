import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtFetch from "../../store/jwt";
import { useHistory } from "react-router-dom";
import { addInventory, receiveInventory } from "../../store/inventories";
import receiveErrors from "../../store/errors";
// import { getCurrentUser } from "../../store/session";

function InventoryForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const uploader = sessionUser ? sessionUser._id : null;

  const [item, setItem] = useState(true);

  const setShowModal = props.setShowModal;

  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => setValue(e.target.value);
    return [value, onChange];
  }

  const [name, onNameChange] = useInput("");
  const [model, onModelChange] = useInput("");
  const [notes, onNotesChange] = useInput("");
  const [user_manuel, onUserManuelChange] = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { uploader, name, model, notes, user_manuel };
    dispatch(addInventory(data));
    setShowModal(false);
    setItem(false);
    // history.push("/");
  };

  const [] = (useInput = "");

  const closeModal = (e) => {
    e.preventDefault();
    setShowModal(false);
    setItem(false);
  };

  if (!item) {
    return null;
  }
  return (
    <>
      <div className="buttonBox">
        <button onClick={closeModal} className="xButton">
          <i className="fa-solid fa-x"></i>
        </button>
      </div>
      <h1>inventory form</h1>
      <form form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="item name"
          value={name}
          onChange={onNameChange}
        />
        <input
          type="text"
          placeholder="model"
          value={model}
          onChange={onModelChange}
        />
        <textarea placeholder="notes" value={notes} onChange={onNotesChange} />
        <input
          type="text"
          placeholder="user manuel link"
          value={user_manuel}
          onChange={onUserManuelChange}
        />
        <button type="submit">Add item</button>
      </form>
    </>
  );
}

export default InventoryForm;
