export const getArtists = (managerId) => {
    return fetch(`http://localhost:3000/artists?_expand=genre&managerId=${managerId}`).then(res => res.json())
}

export const createArtist = (artist) => {
    return fetch("http://localhost:3000/artists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artist)
    })
}

export const getArtistById = (id) => {
    return fetch(`http://localhost:3000/artists/${id}?_expand=genre`).then(res => res.json())
}

export const updateArtist = (artist) => {
    return fetch(`http://localhost:3000/artists/${artist.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artist)
    })
}

export const deleteArtist = (artist) => {
    return fetch(`http://localhost:3000/artists/${artist.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}