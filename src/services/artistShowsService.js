export const getArtistShowsById = (artistId) => {
    return fetch(`http://localhost:3000/artistShows?artistId=${artistId}&_expand=venue`).then(res => res.json())
}

export const getArtistShowByShowId = (showId) => {
    return fetch(`http://localhost:3000/artistShows?id=${showId}&_expand=venue`).then(res => res.json())
}

export const createArtistShow = (show) => {
    return fetch("http://localhost:3000/artistShows", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(show)
    })
}

export const updateArtistShow = (artistShow) => {
    return fetch(`http://localhost:3000/artistShows/${artistShow.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artistShow)
    })
}

export const deleteArtistShow = (artistShow) => {
    return fetch(`http://localhost:3000/artistShows/${artistShow.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}