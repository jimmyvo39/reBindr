import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import InventoryEditForm from "./InventoryEditForm";

function InventoryEditFormModal(props) {
  const inventory = props.inventory;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="edit-form-btn">
        <i class="fa-solid fa-pen-to-square fa-2x"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <InventoryEditForm
            inventory={inventory}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

export default InventoryEditFormModal;
