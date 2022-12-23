import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { deleteInventory } from "../../store/inventories";
import InventoryFormModal from "../InventoryCreateFormModal";
import InventoryEditFormModal from "../InventoryEditFormModal";

// import {deleteQuestion} from "../../store/questions";

const InventoryIndexItem = ({ inventory }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [item, setItem] = useState(true);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteInventory(inventory._id));
    setItem(false);
  };

  return (
    <>
      {item && (
        <li>
          <div
            onClick={() => history.push(`/inventories/${inventory._id}`)}
            className="item-button"
          >
            {inventory.name}
          </div>

          <InventoryEditFormModal inventory={inventory} />

          <button onClick={handleDelete} className="delete-btn">
            <i class="fa-solid fa-trash fa-2x"></i>
          </button>
        </li>
      )}
    </>
  );
};

export default InventoryIndexItem;
