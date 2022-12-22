import React, {useState} from "react";
import { useDispatch } from "react-redux";

const ReminderShareForm = () => {
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        const data = { phone, email};
        // dispatch(createReminder(data));
        // setShowModal(false);
        // setItem(false);
    };

    function useInput(initialValue) {
        const [value, setValue] = useState(initialValue);
        const onChange = (e) => setValue(e.target.value);
        return [value, onChange];
    }
    
    const [email, onEmailChange] = useInput();
    const [phone, onPhoneChange] = useInput();

    const closeModal = (e) => {
        e.preventDefault();
        // setShowModal(false);
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
          placeholder="phone"
          onChange={onPhoneChange}
        />
        <button type="submit">Send reminder</button>

        </form>
        </>
    )
}

export default ReminderShareForm