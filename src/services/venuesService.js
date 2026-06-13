import { getAuthHeader } from "./tokenService"
import { API_URL } from "./config"

export const getVenues = () => {
    return fetch(`${API_URL}/venues`).then(res => res.json())
}

export const createVenue = (venue) => {
    const isFormData = venue instanceof FormData
    return fetch(`${API_URL}/venues`, {
        method: "POST",
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...getAuthHeader()
        },
        body: isFormData ? venue : JSON.stringify(venue)
    })
}

export const getVenueById = (id) => {
    return fetch(`${API_URL}/venues/${id}`).then(res => res.json())
}

export const updateVenue = (venue) => {
    const isFormData = venue instanceof FormData
    const id = isFormData ? venue.get('id') : venue.id
    return fetch(`${API_URL}/venues/${id}`, {
        method: "PUT",
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...getAuthHeader()
        },
        body: isFormData ? venue : JSON.stringify(venue)
    })
}

export const deleteVenue = (id) => {
    return fetch(`${API_URL}/venues/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}
