import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOpenMicById, updateOpenMic } from "../../services/eventService"
import { getVenues } from "../../services/venuesService"

export const EditOpenMic = () => {
    const { openMicId } = useParams()
    const [openMic, setOpenMic] = useState({})
    const [venues, setVenues] = useState([])
    const [venue, setVenue] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getOpenMicById(openMicId).then((array) => {
            setOpenMic(array)
        })
        getVenues().then(setVenues)
    }, [openMicId])

    useEffect(() => {
        const venue = venues.filter((venue) => venue.id === openMic.venueId)
        setVenue(venue[0])
    }, [venues, openMic])

    const handleUpdateOpenMic = () => {
        if(openMic.eventTitle && openMic.venueId) {
            if(openMic.isRecurring === true) {
                if (openMic.recurrence && openMic.time) {
                    const updatedOpenMic = {
                        id: openMic.id,
                        eventTitle: openMic.eventTitle,
                        venueId: openMic.venueId,
                        managerId: openMic.managerId,
                        isRecurring: openMic.isRecurring,
                        dateTime: null,
                        recurrence: openMic.recurrence,
                        time: openMic.time,
                        dayOfWeek: openMic.dayOfWeek,
                        dayOfMonth: openMic.dayOfMonth
                    }
                    updateOpenMic(updatedOpenMic).then(() => {
                        navigate('/managers')
                    })
                } else {
                    window.alert('Please make sure all fields are filled out before submitting changes')
                }
            } else {
                if (openMic.dateTime) {
                    const updatedOpenMic = {
                        id: openMic.id,
                        eventTitle: openMic.eventTitle,
                        venueId: openMic.venueId,
                        managerId: openMic.managerId,
                        isRecurring: openMic.isRecurring,
                        dateTime: openMic.dateTime,
                        recurrence: null,
                        time: null,
                        dayOfWeek: null,
                        dayOfMonth: null
                    }
                    updateOpenMic(updatedOpenMic).then(() => {
                        navigate('/managers')
                    })
                } else {
                    window.alert('Please make sure all fields are filled out before submitting changes')
                }
            }
        } else {
            window.alert('Please make sure all fields are filled out before submitting changes')
        }
    }


    return (
        <div className="clients-section">
            <div className="create-container-open-mic">
                <h2>{openMic.eventTitle} Edits</h2>
                <div className="create-open-mic-container">
                    <div className="open-mic-not-recurring">
                        <div className="filter-group">
                            <p>Name</p>
                            <input type="text" value={openMic.eventTitle} onChange={(e) => {
                                const copy = {...openMic}
                                copy.eventTitle = e.target.value
                                setOpenMic(copy)
                            }}/>
                        </div>
                        <div className="filter-group">
                            <p>Venue</p>
                            <select onChange={(e) => {
                                const copy = {...openMic}
                                copy.venueId = parseInt(e.target.value)
                                setOpenMic(copy)
                            }}>
                                <option key={venue?.id} value={venue?.id} selected>{venue?.venueName}</option>
                                {venues.map(
                                    (venue) => {
                                        return <option value={venue.id} key={venue.id}>{venue.venueName}</option>
                                    }
                                )}
                            </select>
                            </div>
                            {!openMic.isRecurring && 
                            <div className="filter-group">
                                <p>Date and Time</p>
                                    <input type="datetime-local" value={openMic.dateTime} onChange={(e) => {
                                        const copy = {...openMic}
                                        copy.dateTime = e.target.value
                                        setOpenMic(copy)
                                    }} />
                            </div>}
                            
                            <div>
                                <label>
                                    Recurring Event
                                    <input 
                                    type="checkbox" 
                                    checked={openMic.isRecurring}
                                    onChange={(e) => {
                                        const copy = {...openMic}
                                        copy.isRecurring = e.target.checked
                                        setOpenMic(copy)
                                    }} 
                                />
                                </label>
                            </div>
                    </div>

                    {openMic.isRecurring && (
                    <div className="open-mic-is-recurring">
                        <div>
                            <div className="filter-group">
                                <p>Recurrence</p>
                                <select value={openMic.recurrence} onChange={(e) => {
                                    const copy = {...openMic}
                                    copy.recurrence = e.target.value
                                    setOpenMic(copy)
                                }}>
                                    {openMic.recurrence ? (
                                        <option value={openMic.recurrence}>{openMic.recurrence}</option>
                                    ) : (
                                        <option>Please select recurrence</option>
                                    )}
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                                    </div>
                                    <div className="filter-group">
                                        <p>Day of Week</p>
                                        <select onChange={(e) => {
                                            const copy = {...openMic}
                                            copy.dayOfWeek = e.target.value
                                            setOpenMic(copy)
                                        }}>
                                            {openMic.dayOfWeek ? (
                                                <option value={openMic.dayOfWeek}>{openMic.dayOfWeek}</option>
                                            ) : (
                                                <option>Please select a day</option>
                                            )}
                                            <option value='Monday'>Monday</option>
                                            <option value='Tuesday'>Tuesday</option>
                                            <option value='Wednesday'>Wednesday</option>
                                            <option value='Thursday'>Thursday</option>
                                            <option value='Friday'>Friday</option>
                                            <option value='Saturday'>Saturday</option>
                                            <option value='Sunday'>Sunday</option>
                                        </select>
                                    </div>
                                {openMic.recurrence === 'Monthly' && 
                                    <div className="filter-group">
                                        <p>Day of Month</p>
                                        <select onChange={(e) => {
                                            const copy = {...openMic}
                                            copy.dayOfMonth = e.target.value
                                            setOpenMic(copy)
                                        }}>
                                            {openMic.dayOfMonth ? (
                                                <option value={openMic.dayOfMonth}>{openMic.dayOfMonth}</option>
                                            ) : (
                                                <option>Please select day of month</option>
                                            )}
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
                                <input type="time" value={openMic.time} onChange={(e) => {
                                    const copy = {...openMic}
                                    copy.time = e.target.value
                                    setOpenMic(copy)
                                }} />
                                </div>
                            </div>
                        </div>
                        )}
                </div>
                <div>
                    <button className="submit-btn-open-mic-edits" onClick={() => {
                        handleUpdateOpenMic()
                    }}>
                        <a>Save Changes</a>
                    </button>          
                </div>
            </div>
        </div>
    )
}