import React, {useState} from "react";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import jwtFetch from "../../store/jwt";
import '../InventoryCreateFormModal/InventoryCreateForm.css'

const ReminderShareForm = (props) => {
    // const {id} = useParams();
    const reminderId = props.reminderId

    // function useInput(initialValue) {
    //     const [value, setValue] = useState(initialValue);
    //     const onChange = (e) => setValue(e.target.value);
    //     return [value, onChange];
    // }
    
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState("");
    const setShowModal = props.setShowModal;

    const closeModal = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && phone) {
            jwtFetch(`/api/reminders/${reminderId}/shareReminder`,{
                method: "POST",
                body: JSON.stringify({email: email, phone: phone})
            })
        } else if (email) {
            jwtFetch(`/api/reminders/${reminderId}/shareReminder`,{
                method: "POST",
                body: JSON.stringify({email: email})
            })
        } else if (phone) {
            jwtFetch(`/api/reminders/${reminderId}/shareReminder`,{
                method: "POST",
                body: JSON.stringify({phone: phone})
            })
        } else {
            setErrors("Email or Phone number required")
            return 
        }
        setShowModal(false)
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
            <form onSubmit={(e) => handleSubmit(e)} className="reminder-form">
                <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="tel"
                value={phone}
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
                />
                {errors &&
                    <p>{errors}</p>
                }
                <button className="create-form-btn">Send reminder</button>
            </form>
        </div>
        </>
    )
}

export default ReminderShareForm