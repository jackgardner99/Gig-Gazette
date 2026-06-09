import { getAuthHeader } from "./tokenService"

export const getVenues = () => {
    return fetch("https://gig-gazette-api-production.up.railway.app/venues").then(res => res.json())
}

export const createVenue = (venue) => {
    const isFormData = venue instanceof FormData
    return fetch("https://gig-gazette-api-production.up.railway.app/venues", {
        method: "POST",
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...getAuthHeader()
        },
        body: isFormData ? venue : JSON.stringify(venue)
    })
}

export const getVenueById = (id) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/venues/${id}`).then(res => res.json())
}

export const updateVenue = (venue) => {
    const isFormData = venue instanceof FormData
    const id = isFormData ? venue.get('id') : venue.id
    return fetch(`https://gig-gazette-api-production.up.railway.app/venues/${id}`, {
        method: "PUT",
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...getAuthHeader()
        },
        body: isFormData ? venue : JSON.stringify(venue)
    })
}

export const deleteVenue = (id) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/venues/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}