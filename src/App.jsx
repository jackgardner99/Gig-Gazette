
import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import './templatemo-3d-coverflow.css'
import { Login } from './components/auth/Login'
import { ApplicationView } from './components/views/ApplicationView'
import { Authorized } from './components/views/Authorized'
import { CustomerNavbar } from './components/nav/CustomerNavbar'
import { MapPage } from './components/map/MapPage'
import { Register } from './components/auth/Register'


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
        <Route path='register' element={<Register />} />
      </Route>
        <Route path="*" element={
          <Authorized>
            <ApplicationView />
          </Authorized>
        } />
    </Routes>
  )
}

export default App
