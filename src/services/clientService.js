import { getAuthHeader } from "./tokenService"

export const getArtists = (managerId) => {
    return fetch(`http://localhost:8000/artists?managerId=${managerId}`).then(res => res.json())
}

export const createArtist = (artist) => {
    return fetch("http://localhost:8000/artists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(artist)
    })
}

export const getArtistById = (id) => {
    return fetch(`http://localhost:8000/artists/${id}`).then(res => res.json())
}

export const updateArtist = (artist) => {
    return fetch(`http://localhost:8000/artists/${artist.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(artist)
    })
}

export const deleteArtist = (artist) => {
    return fetch(`http://localhost:8000/artists/${artist.id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}
