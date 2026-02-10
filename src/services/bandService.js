export const getBands = (managerId) => {
    return fetch(`http://localhost:3000/bands?_expand=genre&managerId=${managerId}`).then(res => res.json())
}

export const createBand = (band) => {
    return fetch("http://localhost:3000/bands", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(band)
    })
}

export const getBandById = (id) => {
    return fetch(`http://localhost:3000/bands/${id}`).then(res => res.json())
}

export const updateBand = (band) => {
    return fetch(`http://localhost:3000/bands/${band.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(band)
    })
}

export const deleteBand = (band) => {
    return fetch(`http://localhost:3000/bands/${band.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}