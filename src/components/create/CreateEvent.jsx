import { useEffect, useState } from "react"
import { getVenues } from "../../services/venuesService"
import { Link, useNavigate } from "react-router-dom"
import { createOpenMic } from "../../services/eventService"

export const CreateEvent = ({ manager }) => {
    const [newOpenMic, setNewOpenMic] = useState({ eventTitle: "" })
    const [venues, setVenues] = useState([])
    const [venue, setVenue] = useState(0)
    const [dateTime, setDateTime] = useState('')
    const [time, setTime] = useState('')
    const [dayOfWeek, setDayOfWeek] = useState('')
    const [isRecurring, setIsRecurring] = useState(false)
    const [recurrence, setRecurrence] = useState('')
    const [dayOfMonth, setDayOfMonth] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getVenues().then(setVenues)
    }, [manager])

    const handleSubmit = () => {
        if(newOpenMic.eventTitle && venue) {
                    if(isRecurring === true) {
                        if (recurrence && time) {
                            if(recurrence === "Weekly") {
                                if(dayOfWeek) {
                                    const openMic = {
                                        eventTitle: newOpenMic.eventTitle,
                                        venueId: venue,
                                        managerId: manager.id,
                                        isRecurring: isRecurring,
                                        dateTime: null,
                                        recurrence: recurrence,
                                        time: time,
                                        dayOfWeek: dayOfWeek,
                                        dayOfMonth: dayOfMonth
                                    }
                                    createOpenMic(openMic).then(() => {
                                        navigate('/managers')
                                    })
                                } else {
                                    window.alert('Please make sure all fields are filled out before submitting')
                                }
                        } else if (recurrence === "Monthly") {
                            if (dayOfMonth) {
                                const openMic = {
                                eventTitle: newOpenMic.eventTitle,
                                venueId: venue,
                                managerId: manager.id,
                                isRecurring: isRecurring,
                                dateTime: null,
                                recurrence: recurrence,
                                time: time,
                                dayOfWeek: dayOfWeek,
                                dayOfMonth: dayOfMonth
                            }
                            createOpenMic(openMic).then(() => {
                                navigate('/managers')
                            })
                            } else {
                                window.alert('Please make sure all fields are filled out before submitting')

                            }
                        }
                        } else {
                            window.alert('Please make sure all fields are filled out before submitting')
                        }
                    } else {
                        if (dateTime) {
                            const openMic = {
                                eventTitle: newOpenMic.eventTitle,
                                venueId: venue,
                                managerId: manager.id,
                                isRecurring: isRecurring,
                                dateTime: dateTime,
                                recurrence: null,
                                time: null,
                                dayOfWeek: null,
                                dayOfMonth: null
                            }
                            createOpenMic(openMic).then(() => {
                                navigate('/managers')
                            })
                        } else {
                            window.alert('Please make sure all fields are filled out before submitting')
                        }
                    }
            } else {
                window.alert('Please make sure all fields are filled out before submitting')
        }
    }


    return (
        <div>
            <div>
                <Link to={'/managers'}>
                    <button className="btn--primary">Back to Clients</button>
                </Link>
            </div>
            <div>
                <h2 className="form__section-title">Create Open Mic</h2>
                <div className="form">
                    <div>
                        <div>
                            <p>Name</p>
                            <input className="form__input" type="text" placeholder="Open Mic Name" onChange={(event) => {
                                    const copy = {...newOpenMic}
                                    copy.eventTitle = event.target.value
                                    setNewOpenMic(copy)
                                }
                            }/>
                        </div>
                        <div>
                            <p>Genre</p>
                            <select className="form__select" onChange={(event) => {
                                setVenue(parseInt(event.target.value))
                            }}>
                                <option value={0} key={0}>Please select venue</option>
                                {venues.map(
                                    (venue) => {
                                        return <option value={venue.id} key={venue.id}>
                                            {venue.venueName}            
                                        </option>
                                    }
                                )}
                            </select>
                        </div>
                        {!isRecurring && 
                        <div>
                            <label>
                                <p>Date and Time</p>
                                <input className="form__input" type="datetime-local" onChange={(e) => {
                                    setDateTime(e.target.value)
                                }} />
                            </label>
                        </div>}
                        
                        <div>
                            <label>
                                Recurring Event
                                <input 
                                className="form__check"
                                type="checkbox" 
                                checked={isRecurring}
                                onChange={(e) => setIsRecurring(e.target.checked)} 
                                />
                            </label>
                        </div>
                    </div>

                    {isRecurring && (
                    <div>
                        <div>
                            <p>Recurrence</p>
                            <select className="form__select" value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
                                <option>Please select recurrence</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                        <div>
                            <p>Day of Week</p>
                            <select className="form__select" onChange={(e) => setDayOfWeek(e.target.value)}>
                                <option>Please select a day</option>
                                <option value='Monday'>Monday</option>
                                <option value='Tuesday'>Tuesday</option>
                                <option value='Wednesday'>Wednesday</option>
                                <option value='Thursday'>Thursday</option>
                                <option value='Friday'>Friday</option>
                                <option value='Saturday'>Saturday</option>
                                <option value='Sunday'>Sunday</option>
                            </select>
                        </div>
                        {recurrence === 'Monthly' && 
                            <div>
                                <p>Day of Month</p>
                                <select className="form__select" onChange={(e) => setDayOfMonth(e.target.value)}>
                                    <option>Please select day of month</option>
                                    <option value='1st'>1st</option>
                                    <option value='2nd'>2nd</option>
                                    <option value='3rd'>3rd</option>
                                    <option value='4th'>4th</option>
                                </select>
                                of every Month
                            </div>
                        }
                        <div>
                            <p>Time</p>
                            <input className="form__input" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div>
                <button className="form__day-btn" onClick={handleSubmit}><a>Create Event</a></button>
            </div>
        </div>
        )
}