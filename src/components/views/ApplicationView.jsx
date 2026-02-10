import { useEffect, useState } from "react"
import { ManagerView } from "./ManagerView"

export const ApplicationView = () => {
    const [manager, setManager] = useState({})

    useEffect(() => {
        const localManager = localStorage.getItem("manager")
        const managerObject = JSON.parse(localManager)

        setManager(managerObject)
    }, [])

    return <ManagerView manager={ manager }/>
}