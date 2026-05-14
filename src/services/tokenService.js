export const getAuthHeader = () => {
    const manager = JSON.parse(localStorage.getItem("manager"))
    return manager?.token ? { "Authorization": `Token ${manager.token}` } : {}
}
