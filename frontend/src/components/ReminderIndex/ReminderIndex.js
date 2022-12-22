
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import ReminderIndexItem from "./ReminderIndexitem";
import { fetchItemReminders, getReminders} from "../../store/reminders";

function ReminderIndex () {
    const dispatch = useDispatch()
    const _id = useParams()
    
    useEffect(()=>{
        dispatch(fetchItemReminders(_id))
    },[_id])
    
    const reminders = useSelector(getReminders)

    const ReminderIndexItems = reminders.map((reminder) => {
        return <ReminderIndexItem reminder={reminder} key={reminder._id} />;
    });

    return(
    <>
        <div>
            <ul className="index-list">{ReminderIndexItems}</ul>
        </div>
    </>
    )
}

export default ReminderIndex