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
    const [dayOfWeek, setDayOfWeek] = useState('Monday')
    const [isRecurring, setIsRecurring] = useState(false)
    const [recurrence, setRecurrence] = useState('weekly')
    const [dayOfMonth, setDayOfMonth] = useState('1st')
    const navigate = useNavigate()

    useEffect(() => {
        getVenues().then(setVenues)
    }, [manager])

    const handleSubmit = () => {
        if (newOpenMic.eventTitle && venue) {
            if (dateTime || time) {
                const openMic = {
                eventTitle: newOpenMic.eventTitle,
                venueId: venue,
                managerId: manager.id,
                isRecurring: isRecurring,
                dateTime: !isRecurring ? dateTime : null,
                recurrence: isRecurring ? recurrence : null,
                time: isRecurring ? time : null,
                dayOfWeek: isRecurring ? dayOfWeek : null,
                dayOfMonth: isRecurring && recurrence === 'monthly' ? dayOfMonth : null
                }
    
                createOpenMic(openMic).then(() => {
                    setNewOpenMic({ name: "" })
                    setVenue(0)
                    navigate('/managers')
                })
            }
        }
    }


    return (
        <div className="clients-section">
            <div className="back-button-container">
                <Link to={'/managers'}>
                    <button className="button">Back to Clients</button>
                </Link>
            </div>
            <div className="create-container-open-mic">
                <h2>Create Open Mic</h2>
                <div className="create-open-mic-container">
                    <div className="open-mic-not-recurring">
                        <div className="filter-group">
                            <p>Name</p>
                            <input type="text" placeholder="Open Mic Name" onChange={(event) => {
                                    const copy = {...newOpenMic}
                                    copy.eventTitle = event.target.value
                                    setNewOpenMic(copy)
                                }
                            }/>
                        </div>
                        <div className="filter-group">
                            <p>Genre</p>
                            <select onChange={(event) => {
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
                        <div className="filter-group">
                            <label>
                                <p>Date and Time</p>
                                <input type="datetime-local" onChange={(e) => {
                                    setDateTime(e.target.value)
                                }} />
                            </label>
                        </div>}
                        
                        <div>
                            <label>
                                Recurring Event
                                <input 
                                type="checkbox" 
                                checked={isRecurring}
                                onChange={(e) => setIsRecurring(e.target.checked)} 
                                />
                            </label>
                        </div>
                    </div>

                    {isRecurring && (
                    <div className="open-mic-is-recurring">
                        <div className="filter-group">
                            <p>Recurrence</p>
                            <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
                                <option>Please select recurrence</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <p>Day of Week</p>
                            <select onChange={(e) => setDayOfWeek(e.target.value)}>
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
                            <div className="filter-group">
                                <p>Day of Month</p>
                                <select onChange={(e) => setDayOfMonth(e.target.value)}>
                                    <option>Please select day of month</option>
                                    <option value='1st'>1st</option>
                                    <option value='2nd'>2nd</option>
                                    <option value='3rd'>3rd</option>
                                    <option value='4th'>4th</option>
                                </select>
                                of every Month
                            </div>
                        }
                        <div className="filter-group">
                            <p>Time</p>
                            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div>
                <button className="submit-btn-open-mic" onClick={handleSubmit}><a>Create Event</a></button>
            </div>
        </div>
        )
}