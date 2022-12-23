import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReminderShareForm from "./ReminderShareForm";

function ReminderShareFormModal(props) {
  const [showModal, setShowModal] = useState(false);
  const reminderId = props.reminderId;

  return (
    <>
      <button onClick={() => setShowModal(true)} className="reminder-share-btn">
        <i class="fa-solid fa-paper-plane fa-2x"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReminderShareForm
            reminderId={reminderId}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

export default ReminderShareFormModal;
