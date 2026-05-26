import { getAuthHeader } from "./tokenService"

export const getShows = () => {
    return fetch("https://api.giggazette.com/shows").then(res => res.json())
}

export const getShowsByUserId = (userId) => {
    return fetch(`https://api.giggazette.com/shows?userId=${userId}`).then(res => res.json())
}

export const getShowById = (showId) => {
    return fetch(`https://api.giggazette.com/shows/${showId}`).then(res => res.json())
}

export const getShowsByVenueId = (venueId) => {
    return fetch(`https://api.giggazette.com/shows?venueId=${venueId}`).then(res => res.json())
}

export const createArtistShow = (show) => {
    return fetch("https://api.giggazette.com/shows", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(show)
    })
}

export const updateArtistShow = (artistShow) => {
    return fetch(`https://api.giggazette.com/shows/${artistShow.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(artistShow)
    })
}

export const deleteArtistShow = (artistShow) => {
    return fetch(`https://api.giggazette.com/shows/${artistShow.id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}
