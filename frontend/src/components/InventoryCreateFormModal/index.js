import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import InventoryForm from "./InventoryCreateForm";

function InventoryFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="signupFormButton">
        <div className="signupFormButtonText">Add&nbsp;Item</div>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <InventoryForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default InventoryFormModal;
