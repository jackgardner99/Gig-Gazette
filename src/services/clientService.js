import { getAuthHeader } from "./tokenService"

export const getClients = () => {
    return fetch("https://api.giggazette.com/clients", {
        headers: { ...getAuthHeader() }
    }).then(res => res.json())
}

export const createClient = (client) => {
    return fetch("https://api.giggazette.com/clients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(client)
    })
}

export const getClientById = (id) => {
    return fetch(`https://api.giggazette.com/clients/${id}`).then(res => res.json())
}

export const updateClient = (client) => {
    return fetch(`https://api.giggazette.com/clients/${client.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(client)
    })
}

export const deleteClient = (client) => {
    return fetch(`https://api.giggazette.com/clients/${client.id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}
