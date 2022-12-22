import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import InventoryEditForm from "./InventoryEditForm";

function InventoryEditFormModal(props) {
  const inventory = props.inventory;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="edit-form-btn">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="edit-icon-btn"
        ></FontAwesomeIcon>
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
