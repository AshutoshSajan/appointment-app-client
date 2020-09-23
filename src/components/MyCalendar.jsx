import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
const localizer = momentLocalizer(moment);

const MyCalendar = props => {
    const [eventsList, setEventsList] = useState([])

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/events")
            .then(res => res.json())
            .then(data => {
                console.log(data, "event data");
                setEventsList(data.events)
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div div >
            <Calendar
                localizer={localizer}
                events={eventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                views={['month', 'day']}
            />
        </div>
    )
}

export default MyCalendar;