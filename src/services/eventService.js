import { getAuthHeader } from "./tokenService"
import { API_URL } from "./config"

export const createOpenMic = (openMic) => {
    return fetch(`${API_URL}/open_mics`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(openMic)
    })
}

export const getOpenMicsByManagerId = (managerId) => {
    return fetch(`${API_URL}/open_mics?managerId=${managerId}`).then((res) => res.json())
}

export const getOpenMics = () => {
    return fetch(`${API_URL}/open_mics`).then((res) => res.json())
}

export const getWritersRounds = () => {
    return fetch(`${API_URL}/writers_rounds`).then((res) => res.json())
}

export const getOpenMicById = (id) => {
    return fetch(`${API_URL}/open_mics/${id}`).then(res => res.json())
}

export const updateOpenMic = (openMic) => {
    return fetch(`${API_URL}/open_mics/${openMic.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(openMic)
    })
}

export const deleteOpenMic = (openMic) => {
    return fetch(`${API_URL}/open_mics/${openMic.id}`, {
        method: 'DELETE',
        headers: { ...getAuthHeader() }
    })
}

export const createWritersRound = (writersRound) => {
    return fetch(`${API_URL}/writers_rounds`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(writersRound)
    })
}

export const getWritersRoundById = (id) => {
    return fetch(`${API_URL}/writers_rounds/${id}`).then(res => res.json())
}

export const updateWritersRound = (writersRound) => {
    return fetch(`${API_URL}/writers_rounds/${writersRound.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(writersRound)
    })
}

export const deleteWritersRound = (id) => {
    return fetch(`${API_URL}/writers_rounds/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}

export const importCalendar = (icsFile, venueIds) => {
    const formData = new FormData()
    formData.append('calendar_file', icsFile)
    venueIds.forEach(id => formData.append('venue_ids', id))
    return fetch(`${API_URL}/calendar-import`, {
        method: 'POST',
        headers: { ...getAuthHeader() },
        body: formData
    }).then(res => res.json())
}

export const importCalendarFromUrl = (url, venueIds) => {
    return fetch(`${API_URL}/calendar-import/from-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({ url, venue_ids: venueIds })
    }).then(res => res.json())
}
