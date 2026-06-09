import { getAuthHeader } from "./tokenService"

export const createOpenMic = (openMic) => {
    return fetch("https://gig-gazette-api-production.up.railway.app/open_mics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(openMic)
    })
}

export const getOpenMicsByManagerId = (managerId) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/open_mics?managerId=${managerId}`).then((res) => res.json())
}

export const getOpenMics = () => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/open_mics`).then((res) => res.json())
}

export const getWritersRounds = () => {
    return fetch('https://gig-gazette-api-production.up.railway.app/writers_rounds').then((res) => res.json())
}

export const getOpenMicById = (id) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/open_mics/${id}`).then(res => res.json())
}

export const updateOpenMic = (openMic) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/open_mics/${openMic.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(openMic)
    })
}

export const deleteOpenMic = (openMic) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/open_mics/${openMic.id}`, {
        method: 'DELETE',
        headers: { ...getAuthHeader() }
    })
}

export const createWritersRound = (writersRound) => {
    return fetch("https://gig-gazette-api-production.up.railway.app/writers_rounds", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(writersRound)
    })
}

export const getWritersRoundById = (id) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/writers_rounds/${id}`).then(res => res.json())
}

export const updateWritersRound = (writersRound) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/writers_rounds/${writersRound.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(writersRound)
    })
}

export const deleteWritersRound = (id) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/writers_rounds/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}
