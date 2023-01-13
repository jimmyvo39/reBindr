import React, {useDebugValue, useEffect} from "react";
import events from "./events";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchReminders, getReminders} from "../../store/reminders";
import { useDispatch, useSelector } from "react-redux";


const localizer = momentLocalizer(moment);

// const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const BigCalendar = () => {
    const dispatch= useDispatch()

    const reminders = useSelector(getReminders)

    const remindersFormatted = reminders.map((reminder) => {
        return {
            'title': reminder.title,
            'start': new Date(reminder.date),
            'end': new Date(reminder.date)
          } ;
    });


    useEffect(()=>{
        dispatch(fetchReminders())
    },[])

    const styling = {height: "500px",  
                    width: "600px",
                    // fontSize: "50%"
                    };

    return (
        <>
           
        <div style={styling}>
            <Calendar

            localizer={localizer}
            events={remindersFormatted}

            startAccessor="start"
            endAccessor="end"

            step={60}
            // views={allViews}
            defaultDate={new Date()}
            popup={false}
            onShowMore={(events, date) => this.setState({ showModal: true, events })}
            />
        </div>

        </>
    )
};

export default BigCalendar;
