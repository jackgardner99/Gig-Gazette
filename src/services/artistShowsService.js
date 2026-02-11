export const getArtistShowsById = (artistId) => {
    return fetch(`http://localhost:3000/artistShows?artistId=${artistId}&_expand=artist&_expand=venue`).then(res => res.json())
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