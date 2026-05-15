
import { Outlet, Route, Routes } from 'react-router-dom'
import { CustomerNavbar } from './components/nav/CustomerNavbar'
import { MapPage } from './components/map/MapPage'
import { SubmitEventPage } from './components/submit/SubmitEventPage'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { RequireAuth } from './components/auth/RequireAuth'


function App() {

  return (
    <Routes>
      <Route path="/"
            element={<>
                <CustomerNavbar />
                <Outlet />
              </>}
            >
        <Route index element={<MapPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="submit" element={
          <RequireAuth>
            <SubmitEventPage />
          </RequireAuth>
        } />
      </Route>
    </Routes>
  )
}

export default App
