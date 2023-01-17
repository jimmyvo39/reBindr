import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtFetch from "../../store/jwt";
import { useHistory } from "react-router-dom";
import {
  addInventory,
  deleteInventory,
  receiveInventory,
  updateInventory,
} from "../../store/inventories";
import '../InventoryCreateFormModal/InventoryCreateForm.css'
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

  const [currentName, setNewName] = useState(inventory.name);
  const [currentModel, setNewModel] = useState(inventory.model);
  const [currentNotes, setNewNotes] = useState(inventory.notes);
  const [currentUserManual, setNewUserManual] = useState(inventory.user_manual);

  const [showNameError, setShowNameError] = useState(false)
  const nameError = 'Name must be between 3 and 30 characters'

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
      ...inventory,
      uploader,
      name: currentName,
      model: currentModel,
      notes: currentNotes,
      user_manual: currentUserManual,
    };
    console.log(currentName)
    if (currentName.length < 3 || currentName.length > 30) {
      setShowNameError(true)
      return
    }

    dispatch(updateInventory(data));
    setShowModal(false);
    setItem(false);
    // history.push("/");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteInventory(inventory._id));
    setItem(false);
  };

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
        <h1>Update Inventory</h1>
        <form onSubmit={onSubmit} className="reminder-form">
          <input
            type="text"
            placeholder="item name"
            value={currentName}
            onChange={onNameChange}
          />
          {showNameError && 
              <div  className="errors">{nameError}</div>
            }
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
          <button type="submit" className="create-form-btn">Update item</button>
        </form>
      </div>
    </>
  );
}

export default InventoryEditForm;
