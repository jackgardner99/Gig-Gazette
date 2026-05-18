import { getAuthHeader } from "./tokenService"

export const getVenues = () => {
    return fetch("http://localhost:8000/venues").then(res => res.json())
}

export const createVenue = (venue) => {
    return fetch("http://localhost:8000/venues", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(venue)
    })
}

export const getVenueById = (id) => {
    return fetch(`http://localhost:8000/venues/${id}`).then(res => res.json())
}

export const updateVenue = (venue) => {
    return fetch(`http://localhost:8000/venues/${venue.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(venue)
    })
}

export const deleteVenue = (id) => {
    return fetch(`http://localhost:8000/venues/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}