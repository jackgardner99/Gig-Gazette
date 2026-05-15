import { getAuthHeader } from "./tokenService"

export const loginManager = (username, password) => {
    return fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    }).then(res => res.json())
}

export const getManagerProfile = () => {
    return fetch("http://localhost:8000/users", {
        headers: { ...getAuthHeader() }
    }).then(res => res.json())
}

export const createManager = (manager) => {
    return fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manager)
    })
}
