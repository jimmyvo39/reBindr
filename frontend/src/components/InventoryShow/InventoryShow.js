import React, {useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInventory, getInventory } from "../../store/inventories";
import "./InventoryShow.css";
import ReminderCreateFormModal from "./ReminderCreateFormModal";
import ReminderIndex from "../ReminderIndex/ReminderIndex";
const InventoryShow = (props) => {
    const {id} = useParams();
    const dispatch = useDispatch();

    // console.log(id)
    const item = useSelector(getInventory(id))

    const [modalOpen, setModalOpen] = useState(false);
    const setShowModal = props.setShowModal;

    useEffect(()=>{
        dispatch(fetchInventory(id))
    },[id])

    if (item) {
        return(
            <>
                < div className="item-show-page">
                    <div className="inventory-show-containers">
                        <ReminderCreateFormModal/>
                        <div>
                            <ReminderIndex/>
                        </div>
                    </div>
                    <div className="inventory-show-containers">
                        <h1 id="item-name-header">{item ? item.name : ""} details</h1>
                        <h1 className="item-show-details">Model:{item ? item.model : ""}</h1>
                        <div id='notes-div'>
                            <i className="fa-solid fa-clipboard"></i>
                            <h2 className="item-show-details">{item ? item.notes : ""}</h2>
                        </div><i className="fa-solid fa-link"></i>
                        <a href={item ? item.user_manual : ""} target="_blank"  rel="noreferrer"> User Manuel</a>
                    </div>
                </div>
            </>
            
        )
    }
}

export default InventoryShow