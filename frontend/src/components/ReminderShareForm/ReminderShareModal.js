import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReminderShareForm from "./ReminderShareForm";

function ReminderShareFormModal(props) {
  const [showModal, setShowModal] = useState(false);
  const reminderId = props.reminderId

  return (
    <>
      <button onClick={() => setShowModal(true)} className="signupFormButton">
        <i class="fa-solid fa-paper-plane"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReminderShareForm reminderId={reminderId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ReminderShareFormModal;
