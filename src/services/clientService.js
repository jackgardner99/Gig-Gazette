import { getAuthHeader } from "./tokenService"
import { API_URL } from "./config"

export const getClients = () => {
    return fetch(`${API_URL}/clients`, {
        headers: { ...getAuthHeader() }
    }).then(res => res.json())
}

export const createClient = (client) => {
    return fetch(`${API_URL}/clients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(client)
    })
}

export const getClientById = (id) => {
    return fetch(`${API_URL}/clients/${id}`).then(res => res.json())
}

export const updateClient = (client) => {
    return fetch(`${API_URL}/clients/${client.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(client)
    })
}

export const deleteClient = (client) => {
    return fetch(`${API_URL}/clients/${client.id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    })
}
