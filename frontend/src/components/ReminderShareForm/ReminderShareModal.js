import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReminderShareForm from "./ReminderShareForm";

function ReminderShareFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="signupFormButton">
        Share
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReminderShareForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ReminderShareFormModal;
