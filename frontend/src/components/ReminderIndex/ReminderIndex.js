
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import ReminderIndexItem from "./ReminderIndexitem";
import { getCurrentUser } from "../../store/session";
import { fetchItemReminders, getReminders} from "../../store/reminders";

function ReminderIndex () {
    const dispatch = useDispatch()
    const reminders = useSelector(getReminders)
    const _id = useParams()
    console.log(_id)

    useEffect(()=>{
        dispatch(fetchItemReminders(_id))
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