import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { CustomerNavbar } from "../nav/CustomerNavbar"

export const CustomerView = () => {
    return (
        <Routes>
            <Route path=""
                element={<>
                    <CustomerNavbar />
                    <Outlet />
                </>}
            >
                <Route index element={<MapPage />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    )
}