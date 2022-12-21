import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { deleteInventory } from "../../store/inventories";

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
          <h1>top</h1>
          <div
            onClick={() => history.push(`/inventories/${inventory._id}`)}
            className="item-button"
          >
            {inventory.name}- model:{inventory.model}
          </div>
          <button>edit</button>
          <button onClick={handleDelete}>temp delete button</button>
        </li>
      )}
    </>
  );
};

export default InventoryIndexItem;
