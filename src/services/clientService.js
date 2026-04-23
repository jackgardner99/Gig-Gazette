import { getAuthHeader } from "./tokenService"

export const getClients = () => {
    return fetch("http://localhost:8000/clients", {
        headers: { ...getAuthHeader() }
    }).then(res => res.json())
}

export const createClient = (client) => {
    return fetch("http://localhost:8000/clients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(client)
    })
}

export const getClientById = (id) => {
    return fetch(`http://localhost:8000/clients/${id}`).then(res => res.json())
}

export const updateClient = (client) => {
    return fetch(`http://localhost:8000/clients/${client.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(client)
    })
}

export const deleteClient = (client) => {
    return fetch(`http://localhost:8000/clients/${client.id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}
