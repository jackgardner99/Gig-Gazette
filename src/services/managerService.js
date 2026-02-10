export const getManagerByEmail = (email) => {
    return fetch(`http://localhost:3000/managers?email=${email}`).then(res => res.json())
}