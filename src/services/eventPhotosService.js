import { API_URL } from "./config"
import { getAuthHeader } from "./tokenService"

export const getEventPhotos = (endpoint, idParam, eventId) => {
    return fetch(`${API_URL}/${endpoint}?${idParam}=${eventId}`).then(res => res.json())
}

export const uploadEventPhoto = (endpoint, formData) => {
    return fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: { ...getAuthHeader() },
        body: formData
    }).then(res => res.json())
}

export const deleteEventPhoto = (endpoint, id) => {
    return fetch(`${API_URL}/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { ...getAuthHeader() }
    })
}
