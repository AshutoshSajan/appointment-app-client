import React, { useEffect, useState } from 'react'
import { eventAPIUrl } from './static.js'
import { Card } from 'antd'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
let allViews = Object.keys(Views).map(k => Views[k])
const localizer = momentLocalizer(moment)

const MyCalendar = (props) => {
  const [eventsList, setEventsList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchEventList(`${eventAPIUrl}/events`)
  }, [])

  const fetchEventList = (url) => {
    fetch(`${eventAPIUrl}/events`)
      .then((res) => res.json())
      .then(({ events }) => {
        let newEventsList = events.map(e => {
          return {
            ...e,
            start: new Date(e.start),
            end: new Date(e.end),
          }
        })
        console.log(newEventsList, "newEventsList");
        setEventsList(newEventsList)

        // setEventsList(events)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(true)
      })
  }

  const handleEventSubmit = (data, url) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(({ event }) => {
        console.log(event, 'my cal event')
        setEventsList([...eventsList, event])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSelect = (event) => {
    const { start, end } = event
    const title = window.prompt('Enter Event Name')
    const data = {
      title,
      start,
      end,
    }
    handleEventSubmit(data, `${eventAPIUrl}/events`)
  }

  return (
    <div div>
      {loading ? (
        <Card style={{ width: 300, marginTop: 16 }} loading={true} size="large" />
      ) : (
          <Calendar
            selectable
            popup
            localizer={localizer}
            events={eventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={allViews}
            onSelectSlot={handleSelect}
            onSelectEvent={event => console.log(event, event.title, event.start, event.end)}
          />
        )}
    </div>
  )
}

export default MyCalendar
