import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import InventoryIndexItem from "./InventoryIndexItem";
import { fetchUserInventories, getInventories } from "../../store/inventories";
import { getCurrentUser } from "../../store/session";
import InventoryFormModal from "../InventoryCreateFormModal";

const InventoryIndex = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const inventories = useSelector(getInventories);
  // const currentUser = useSelector(getCurrentUser())
  // console.log(dispatch(getCurrentUser()))
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserInventories());
  }, [inventories.length]);
  // console.log(inventories)

  const InventoriesIndexItems = inventories.map((inventory) => {
    return <InventoryIndexItem inventory={inventory} key={inventory._id} />;
  });

  //   function testPage() {
  //     history.push(`test`);
  //   }

  if (!inventories) {
    return null;
  }

  return (
    <>
      {modalOpen ? (
        <InventoryFormModal
          onSuccess={() => {
            setModalOpen(false);
          }}
          onClose={() => setModalOpen(false)}
        />
      ) : null}
      <div className="index-wrapper">
        <h1>INVENTORY</h1>
        <InventoryFormModal />
        <div className="inventory-container">
          <ul className="index-list">{InventoriesIndexItems}</ul>
        </div>
      </div>
    </>
  );
};

export default InventoryIndex;
