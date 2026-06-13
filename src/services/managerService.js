import { getAuthHeader } from "./tokenService"
import { API_URL } from "./config"

export const loginManager = (username, password) => {
    return fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    }).then(res => res.json())
}

export const getManagerProfile = () => {
    return fetch(`${API_URL}/users`, {
        headers: { ...getAuthHeader() }
    }).then(res => res.json())
}

export const createManager = (manager) => {
    return fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manager)
    })
}
