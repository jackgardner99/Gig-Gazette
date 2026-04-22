export const getGenres = () => {
    return fetch("http://localhost:8000/genres").then(res => res.json())
}