import React from "react";

const ReminderShareForm = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const data = { uploader, item, title, date, repeat };
        dispatch(createReminder(data));
        setShowModal(false);
        // setItem(false);
      };

    return (
        <>
        <h1>Send Reminder</h1>
        <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={onEmailChange}
        />
        <input
          type="tel"
          value={phone}
          onChange={onPhoneChange}
        />
        <button type="submit">Send reminder</button>

        </form>
        </>
    )
}

export default ReminderShareForm