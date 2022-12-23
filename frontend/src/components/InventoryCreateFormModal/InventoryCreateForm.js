import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtFetch from "../../store/jwt";
import { useHistory } from "react-router-dom";
import { addInventory, receiveInventory } from "../../store/inventories";
import receiveErrors from "../../store/errors";
import './InventoryCreateForm.css'

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

  const [user_manual, onUserManualChange] = useInput("");



  const onSubmit = (e) => {
    e.preventDefault();
    const data = { uploader, name, model, notes, user_manual };
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
      <div className="form-container">

        <div className="buttonBox">
          <button onClick={closeModal} className="xButton">
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <h1>Add to Inventory</h1>
        <form onSubmit={onSubmit} className="reminder-form">
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
            type="url"
            placeholder="user manual link"
            value={user_manual}
            onChange={onUserManualChange}

          />
          <button type="submit" className= "create-form-btn">Add item</button>
        </form>
      </div>
    </>
  );
}

export default InventoryForm;
