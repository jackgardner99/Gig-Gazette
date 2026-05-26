export const getGenres = () => {
    return fetch("https://api.giggazette.com/genres").then(res => res.json())
}