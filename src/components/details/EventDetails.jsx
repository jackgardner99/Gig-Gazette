import { useNavigate, useParams } from "react-router-dom"
import { getShowById } from "../../services/artistShowsService"
import { getOpenMicById, getWritersRoundById } from "../../services/eventService"
import { useEffect, useState } from "react"

const CONFIG = {
    show: {
        label: 'Artist Show',
        getFn: (id) => getShowById(id).then(data => Array.isArray(data) ? data[0] : data),
        hasDate: true,
        hasTicketLink: true,
    },
    openMic: {
        label: 'Open Mic',
        getFn: getOpenMicById,
        hasDate: false,
    },
    writersRound: {
        label: "Writers Round",
        getFn: getWritersRoundById,
        hasDate: true,
    },
}


export const EventDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [details, setDetails] = useState(null)

    useEffect(() => {
        CONFIG.getFn(id).then(data => {
            setDetails({
                event_title: data.event_title ?? '',
                date: data.date ?? '',
                start_time: data.start_time ?? '',
                end_time: data.end_time ?? '',
                description: data.description ?? ''
            })
        })
    }, [id])

    

    return (
        <div className="page-content">
            <div>
                <button
                    onClick={() => {
                        navigate("/")
                    }}
                >Go Back</button>
            </div>
            <div>
                {details.event_title}
            </div>
            <div>
                {details.date}
            </div>
            <div>
                {details.start_time} - {details.end_time}
            </div>
            <div>
                {details.description}
            </div>
        </div>
    )
}