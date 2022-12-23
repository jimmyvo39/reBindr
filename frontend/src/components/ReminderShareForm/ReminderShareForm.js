import React, {useState} from "react";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import jwtFetch from "../../store/jwt";
import '../InventoryCreateFormModal/InventoryCreateForm.css'

const ReminderShareForm = (props) => {
    // const {id} = useParams();
    const reminderId = props.reminderId

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(phone,email)
        jwtFetch(`/api/reminders/${reminderId}/shareReminder`,{
            method: "POST",
            body: JSON.stringify({email: email, phone: phone})
        })
    };

    function useInput(initialValue) {
        const [value, setValue] = useState(initialValue);
        const onChange = (e) => setValue(e.target.value);
        return [value, onChange];
    }
    
    const [email, onEmailChange] = useInput();
    const [phone, onPhoneChange] = useInput();
    const [item, setItem] = useState(true);
    const setShowModal = props.setShowModal;

    const closeModal = (e) => {
        e.preventDefault();
        setShowModal(false);
        setItem(false);
      };

    return (
        <>
        <div className="form-container ">
            <div  className="buttonBox">
                <button onClick={closeModal} className="xButton">
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>
            <h1>Send Reminder</h1>
            <form onSubmit={onSubmit} className="reminder-form">
            <input
            type="email"
            placeholder="email"
            value={email}
            onChange={onEmailChange}
            />
            <input
            type="tel"
            value={phone}
            placeholder="Phone"
            onChange={onPhoneChange}
            />
            <button type="submit" className="create-form-btn">Send reminder</button>

            </form>
        </div>
        </>
    )
}

export default ReminderShareForm