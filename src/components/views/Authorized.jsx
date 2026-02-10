import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    let location = useLocation()

    if (localStorage.getItem("manager")) {
        return children
    } else {
        <Navigate to={"/login"} state={{ from: location }} replace />
    }
    
}