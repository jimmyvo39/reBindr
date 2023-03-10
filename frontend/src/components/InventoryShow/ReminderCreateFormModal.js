import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReminderCreateForm from "../ReminderCreateForm/ReminderCreateForm";

function ReminderCreateFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="create-form-btn" id="add-reminder-button">
        Add Reminder
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReminderCreateForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ReminderCreateFormModal;