import { Navigate, useLocation } from 'react-router-dom'

export const RequireAuth = ({ children }) => {
    const location = useLocation()
    const user = JSON.parse(sessionStorage.getItem("user"))

    if (!user?.token) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }

    return children
}
