import { getAuthHeader } from "./tokenService"

export const loginManager = (username, password) => {
    return fetch("http://localhost:8000/api-token-auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    }).then(res => res.json())
}

export const getManagerProfile = () => {
    return fetch("http://localhost:8000/managers/me/", {
        headers: { ...getAuthHeader() }
    }).then(res => res.json())
}

export const createManager = (manager) => {
    return fetch("http://localhost:8000/managers/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manager)
    })
}
