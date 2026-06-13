import { API_URL } from "./config"

export const getGenres = () => {
    return fetch(`${API_URL}/genres`).then(res => res.json())
}