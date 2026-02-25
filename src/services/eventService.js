export const createOpenMic = (openMic) => {
    return fetch("http://localhost:3000/openMics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(openMic)
    })
}

export const getOpenMics = (managerId) => {
    return fetch(`http://localhost:3000/openMics?managerId=${managerId}&_expand=venue`).then((res) => res.json())
}