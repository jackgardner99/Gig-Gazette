export const createOpenMic = (openMic) => {
    return fetch("http://localhost:3000/openMics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(openMic)
    })
}

export const getOpenMicsByManagerId = (managerId) => {
    return fetch(`http://localhost:3000/openMics?_expand=venue&managerId=${managerId}`).then((res) => res.json())
}

export const getOpenMics = () => {
    return fetch(`http://localhost:3000/openMics?_expand=venue`).then((res) => res.json())
}

export const getOpenMicById = (id) => {
    return fetch(`http://localhost:3000/openMics/${id}`).then(res => res.json())
}

export const updateOpenMic = (openMic) => {
    return fetch(`http://localhost:3000/openMics/${openMic.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(openMic)
    })
}

export const deleteOpenMic = (openMic) => {
    return fetch(`http://localhost:3000/openMics/${openMic.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
}