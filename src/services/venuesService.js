export const getVenues = () => {
    return fetch("http://localhost:3000/venues").then(res => res.json())
}