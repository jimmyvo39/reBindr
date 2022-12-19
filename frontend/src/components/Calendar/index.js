import React from "react";
import events from "./events";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

// const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const BigCalendar = () => {
    const styling = {height: "500px",  
                    width: "600px",
                    };

    return (
        <>
           
        <div style={styling}>
            <Calendar

            localizer={localizer}
            events={events}

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
