import { getAuthHeader } from "./tokenService"

export const loginManager = (username, password) => {
    return fetch("https://gig-gazette-api-production.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    }).then(res => res.json())
}

export const getManagerProfile = () => {
    return fetch("https://gig-gazette-api-production.up.railway.app/users", {
        headers: { ...getAuthHeader() }
    }).then(res => res.json())
}

export const createManager = (manager) => {
    return fetch("https://gig-gazette-api-production.up.railway.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manager)
    })
}
