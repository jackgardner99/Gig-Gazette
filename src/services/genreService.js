export const getGenres = () => {
    return fetch("https://gig-gazette-api-production.up.railway.app/genres").then(res => res.json())
}