
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import ReminderIndexItem from "./ReminderIndexitem";
import { getCurrentUser } from "../../store/session";
import { fetchReminders, getReminders} from "../../store/reminders";

function ReminderIndex () {
    const dispatch = useDispatch()
    const reminders = useSelector(getReminders)

    useEffect(()=>{
        dispatch(fetchReminders())
    },[])





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