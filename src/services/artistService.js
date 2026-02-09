export const getArtists = () => {
    return fetch("http://localhost:3000/artists").then(res => res.json())
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