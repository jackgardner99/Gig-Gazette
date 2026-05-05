import { getAuthHeader } from "./tokenService"

export const createOpenMic = (openMic) => {
    return fetch("http://localhost:8000/open_mics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(openMic)
    })
}

export const getOpenMicsByManagerId = (managerId) => {
    return fetch(`http://localhost:8000/open_mics?managerId=${managerId}`).then((res) => res.json())
}

export const getOpenMics = () => {
    return fetch(`http://localhost:8000/open_mics`).then((res) => res.json())
}

export const getWritersRounds = () => {
    return fetch('http://localhost:8000/writers_rounds').then((res) => res.json())
}

export const getOpenMicById = (id) => {
    return fetch(`http://localhost:8000/open_mics/${id}`).then(res => res.json())
}

export const updateOpenMic = (openMic) => {
    return fetch(`http://localhost:8000/open_mics/${openMic.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(openMic)
    })
}

export const deleteOpenMic = (openMic) => {
    return fetch(`http://localhost:8000/open_mics/${openMic.id}`, {
        method: 'DELETE',
        headers: { ...getAuthHeader() }
    })
}
