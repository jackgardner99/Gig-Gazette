import { useEffect, useState } from "react"
import { getVenues } from "../../services/venuesService"
import { Link } from "react-router-dom"

export const CreateEvent = ({ manager }) => {
    const [newOpenMic, setNewOpenMic] = useState({ name: "" })
    const [venues, setVenues] = useState([])
    const [venue, setVenue] = useState(0)
    const [dateTime, setDateTime] = useState('')
    const [time, setTime] = useState('')
    const [dayOfWeek, setDayOfWeek] = useState('Monday')
    const [isRecurring, setIsRecurring] = useState(false)
    const [recurrence, setRecurrence] = useState('weekly')
    const [dayOfMonth, setDayOfMonth] = useState('1st')

    useEffect(() => {
        getVenues().then(setVenues)
    }, [manager])

    const handleSubmit = () => {
        const openMic = {
            name: newOpenMic.name,
            venue: venue,
            isRecurring: isRecurring,
            dateTime: !isRecurring ? dateTime : null,
            recurrence: isRecurring ? recurrence : null,
            time: isRecurring ? time : null,
            dayOfWeek: isRecurring ? dayOfWeek : null,
            dayOfMonth: isRecurring && recurrence === 'monthly' ? dayOfMonth : null
        }


    }


    return (
        <div className="showcase-main">
                <div>
                    <Link to={'/managers'}>
                        <button  className="cta-button">Back to Clients</button>
                    </Link>
                </div>
                <h2>Create Open Mic</h2>
                <div className="form-group">
                    <input type="text" placeholder="Open Mic Name" onChange={(event) => {
                            const copy = {...newOpenMic}
                            copy.name = event.target.value
                            setNewOpenMic(copy)
                        }
                    }/>
                </div>
                <div className="form-group">
                    <select onChange={(event) => {
                        setVenue(parseInt(event.target.value))
                    }}>
                        <option value={0} key={0}>Please select genre</option>
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
                <div className="form-group">
                    <label>
                        <input type="datetime-local" onChange={(e) => {
                            setDateTime(e.target.value)
                        }} />
                    </label>
                </div>}
                
                <div className='form-group'>
                    <label>
                        <input 
                        type="checkbox" 
                        checked={isRecurring}
                        onChange={(e) => setIsRecurring(e.target.checked)} 
                        />
                        Recurring Event
                    </label>
                </div>

                {isRecurring && (
                <div className='form-group'>
                    <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>

                    <select onChange={(e) => setDayOfWeek(e.target.value)}>
                        <option value='Monday'>Monday</option>
                        <option value='Tuesday'>Tuesday</option>
                        <option value='Wednesday'>Wednesday</option>
                        <option value='Thursday'>Thursday</option>
                        <option value='Friday'>Friday</option>
                        <option value='Saturday'>Saturday</option>
                        <option value='Sunday'>Sunday</option>
                    </select>

                    {recurrence === 'monthly' && 
                        <label>
                            <select onChange={(e) => setDayOfMonth(e.target.value)}>
                                <option value='1st'>1st</option>
                                <option value='2nd'>2nd</option>
                                <option value='3rd'>3rd</option>
                                <option value='4th'>4th</option>
                            </select>
                        </label>
                    }

                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
                )}
                <div>
                    <button className="submit-btn" onClick={handleSubmit}>Create Event</button>
                </div>
            </div>
        )
}