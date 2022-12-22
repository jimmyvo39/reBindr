import React, {useState} from "react";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import jwtFetch from "../../store/jwt";

const ReminderShareForm = () => {
    const {id} = useParams();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(phone,email)
        jwtFetch(`/api/reminders/${id}/shareReminder`,{
            method: "POST",
            body: JSON.stringify({email, phone})
        })
    };

    function useInput(initialValue) {
        const [value, setValue] = useState(initialValue);
        const onChange = (e) => setValue(e.target.value);
        return [value, onChange];
    }
    
    const [email, onEmailChange] = useInput();
    const [phone, onPhoneChange] = useInput();

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