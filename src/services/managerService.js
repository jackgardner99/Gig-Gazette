export const getManagerByEmail = (email) => {
    return fetch(`http://localhost:3000/managers?email=${email}`).then(res => res.json())
}

export const createManager = (manager) => {
    return fetch("http://localhost:3000/managers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(manager)
    })
}