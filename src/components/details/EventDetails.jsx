import { useNavigate, useParams } from "react-router-dom"
import { getShowById } from "../../services/artistShowsService"
import { getOpenMicById, getWritersRoundById } from "../../services/eventService"
import { useState } from "react"

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

    return <></>
}