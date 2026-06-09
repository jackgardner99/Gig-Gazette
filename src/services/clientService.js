import { getAuthHeader } from "./tokenService"

export const getClients = () => {
    return fetch("https://gig-gazette-api-production.up.railway.app/clients", {
        headers: { ...getAuthHeader() }
    }).then(res => res.json())
}

export const createClient = (client) => {
    return fetch("https://gig-gazette-api-production.up.railway.app/clients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(client)
    })
}

export const getClientById = (id) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/clients/${id}`).then(res => res.json())
}

export const updateClient = (client) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/clients/${client.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(client)
    })
}

export const deleteClient = (client) => {
    return fetch(`https://gig-gazette-api-production.up.railway.app/clients/${client.id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}
