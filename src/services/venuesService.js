export const getVenues = () => {
    return fetch("http://localhost:8000/venues").then(res => res.json())
}