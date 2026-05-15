export const getAuthHeader = () => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    return user?.token ? { "Authorization": `Token ${user.token}` } : {}
}
