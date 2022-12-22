import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtFetch from "../../store/jwt";
import { useHistory } from "react-router-dom";
import {
  addInventory,
  deleteInventory,
  receiveInventory,
} from "../../store/inventories";
import receiveErrors from "../../store/errors";
// import { getCurrentUser } from "../../store/session";

function InventoryEditForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const uploader = sessionUser ? sessionUser._id : null;
  const [item, setItem] = useState(true);

  const inventory = props.inventory;

  const setShowModal = props.setShowModal;

  // function useInput(initialValue) {
  //   const [value, setValue] = useState(initialValue);
  //   const onChange = (e) => setValue(e.target.value);
  //   return [value, onChange];
  // }

  // const [name, onNameChange] = useInput("");
  // const [model, onModelChange] = useInput("");
  // const [notes, onNotesChange] = useInput("");
  // const [user_manual, onUserManualChange] = useInput("");

  const [currentName, setNewName] = useState(inventory.name);
  const [currentModel, setNewModel] = useState(inventory.model);
  const [currentNotes, setNewNotes] = useState(inventory.notes);
  const [currentUserManual, setNewUserManual] = useState(inventory.user_manual);

  const onNameChange = (e) => {
    let newName = e.target.value;
    setNewName(newName);
  };

  const onModelChange = (e) => {
    let newModel = e.target.value;
    setNewModel(newModel);
  };

  const onNotesChange = (e) => {
    let newNotes = e.target.value;
    setNewNotes(newNotes);
  };

  const onUserManualChange = (e) => {
    let newUserManual = e.target.value;
    setNewUserManual(newUserManual);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      uploader,
      currentName,
      currentModel,
      currentNotes,
      currentUserManual,
    };
    dispatch(addInventory(data));
    setShowModal(false);
    setItem(false);
    // history.push("/");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteInventory(inventory._id));
    setItem(false);
  };

  // const [] = (useInput = "");

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
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="item name"
          value={currentName}
          onChange={onNameChange}
        />
        <input
          type="text"
          placeholder="model"
          value={currentModel}
          onChange={onModelChange}
        />
        <textarea
          placeholder="notes"
          value={currentNotes}
          onChange={onNotesChange}
        />
        <input
          type="text"
          placeholder="user manual link"
          value={currentUserManual}
          onChange={onUserManualChange}
        />
        <button type="submit">Update item</button>
      </form>
      <button onClick={handleDelete}>temp delete button</button>
    </>
  );
}

export default InventoryEditForm;
