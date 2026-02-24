import { useEffect, useState } from "react"
import { getVenues } from "../../services/venuesService"
import { Link } from "react-router-dom"

export const CreateEvent = ({ manager }) => {
    const [newOpenMic, setNewOpenMic] = useState({ name: "" })
    const [venues, setVenues] = useState([])
    const [venue, setVenue] = useState(0)
    const [dateTime, setDateTime] = useState('')
    const [isRecurring, setIsRecurring] = useState(false)
    const [recurrence, setRecurrence] = useState('weekly')
    const [recurrenceEndDate, setRecurrenceEndDate] = useState('')

    useEffect(() => {
        getVenues().then(setVenues)
    }, [manager])



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
                <div className="form-group">
                    <label>
                        <input type="datetime-local" onChange={(e) => {
                            setDateTime(e.target.value)
                        }} />
                    </label>
                </div>
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

                    <input 
                    type="date" 
                    value={recurrenceEndDate}
                    onChange={(e) => setRecurrenceEndDate(e.target.value)}
                    placeholder="End date"
                    />
                </div>
                )}
                <div>
                    <button className="submit-btn">Create Event</button>
                </div>
            </div>
        )
}