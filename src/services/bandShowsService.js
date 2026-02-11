export const getBandShowsById = (bandId) => {
    return fetch(`http://localhost:3000/bandShows?bandId=${bandId}&_expand=venue`).then(res => res.json())
}

export const createBandShow = (bandShow) => {
    return fetch("http://localhost:3000/bandShows", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bandShow)
    })
}

export const deleteBandShow = (bandShow) => {
    return fetch(`http://localhost:3000/bandShows/${bandShow.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}