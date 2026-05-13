
import { Outlet, Route, Routes } from 'react-router-dom'
import { CustomerNavbar } from './components/nav/CustomerNavbar'
import { MapPage } from './components/map/MapPage'
import { SubmitEventPage } from './components/submit/SubmitEventPage'


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
        <Route path="submit" element={<SubmitEventPage />} />
      </Route>
    </Routes>
  )
}

export default App
