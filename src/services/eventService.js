export const createRecurringOpenMic = (dates) => {
    
}

export const createOpenMic = (openMic) => {
    return fetch("http://localhost:3000/openMics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(openMic)
    })
}