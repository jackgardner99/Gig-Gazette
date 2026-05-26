import { getAuthHeader } from "./tokenService"

export const loginManager = (username, password) => {
    return fetch("https://api.giggazette.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    }).then(res => res.json())
}

export const getManagerProfile = () => {
    return fetch("https://api.giggazette.com/users", {
        headers: { ...getAuthHeader() }
    }).then(res => res.json())
}

export const createManager = (manager) => {
    return fetch("https://api.giggazette.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manager)
    })
}
