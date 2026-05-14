import { getAuthHeader } from "./tokenService"

export const getArtistShows = () => {
    return fetch("http://localhost:8000/shows").then(res => res.json())
}

export const getArtistShowsById = (artistId) => {
    return fetch(`http://localhost:8000/shows?artistId=${artistId}`).then(res => res.json())
}

export const getArtistShowByShowId = (showId) => {
    return fetch(`http://localhost:8000/shows?id=${showId}`).then(res => res.json())
}

export const getArtistShowsByVenueId = (venueId) => {
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
