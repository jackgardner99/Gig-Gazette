import { getAuthHeader } from "./tokenService"

export const getShows = () => {
    return fetch("http://localhost:8000/shows").then(res => res.json())
}

export const getShowsByUserId = (userId) => {
    return fetch(`http://localhost:8000/shows?userId=${userId}`).then(res => res.json())
}

export const getShowById = (showId) => {
    return fetch(`http://localhost:8000/shows/${showId}`).then(res => res.json())
}

export const getShowsByVenueId = (venueId) => {
    return fetch(`http://localhost:8000/shows?venueId=${venueId}`).then(res => res.json())
}

export const createArtistShow = (show) => {
    return fetch("http://localhost:8000/shows", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(show)
    })
}

export const updateArtistShow = (artistShow) => {
    return fetch(`http://localhost:8000/shows/${artistShow.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(artistShow)
    })
}

export const deleteArtistShow = (artistShow) => {
    return fetch(`http://localhost:8000/shows/${artistShow.id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}
