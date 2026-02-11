export const getArtistShowsById = (artistId) => {
    return fetch(`http://localhost:3000/artistShows?artistId=${artistId}&_expand=artist`).then(res => res.json())
}