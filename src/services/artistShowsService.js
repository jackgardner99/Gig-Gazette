import { getAuthHeader } from "./tokenService"
import { API_URL } from "./config"

export const getShows = () => {
    return fetch(`${API_URL}/shows`).then(res => res.json())
}

export const getShowsByUserId = (userId) => {
    return fetch(`${API_URL}/shows?userId=${userId}`).then(res => res.json())
}

export const getShowById = (showId) => {
    return fetch(`${API_URL}/shows/${showId}`).then(res => res.json())
}

export const getShowsByVenueId = (venueId) => {
    return fetch(`${API_URL}/shows?venueId=${venueId}`).then(res => res.json())
}

export const createArtistShow = (show) => {
    return fetch(`${API_URL}/shows`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(show)
    })
}

export const updateArtistShow = (artistShow) => {
    return fetch(`${API_URL}/shows/${artistShow.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(artistShow)
    })
}

export const deleteArtistShow = (artistShow) => {
    return fetch(`${API_URL}/shows/${artistShow.id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}
