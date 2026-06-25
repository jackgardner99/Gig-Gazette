
import { useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { CustomerNavbar } from './components/nav/CustomerNavbar'
import { MapPage } from './components/map/MapPage'
import { SubmitEventPage } from './components/submit/SubmitEventPage'
import { EditEventPage } from './components/edit/EditEventPage'
import { CreateVenuePage } from './components/venue/CreateVenuePage'
import { EditVenuePage } from './components/venue/EditVenuePage'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { RequireAuth } from './components/auth/RequireAuth'
import { EventDetails } from './components/details/EventDetails'
import { Tutorial } from './components/tutorial/Tutorial'


function App() {
  const [showTutorial, setShowTutorial] = useState(false)

  return (
    <Routes>
      <Route path="/"
            element={<>
                <CustomerNavbar onStartTour={() => setShowTutorial(true)} />
                <Tutorial open={showTutorial} onClose={() => setShowTutorial(false)} />
                <Outlet />
              </>}
            >
        <Route index element={<MapPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="details/show/:id" element={<EventDetails eventType="show"/>} />
        <Route path="details/open-mic/:id" element={<EventDetails eventType="openMic"/>} />
        <Route path="details/writers-round/:id" element={<EventDetails eventType="writersRound" />} />
        <Route path="submit" element={
          <RequireAuth>
            <SubmitEventPage />
          </RequireAuth>
        } />
        <Route path="venues/new" element={
          <RequireAuth>
            <CreateVenuePage />
          </RequireAuth>
        } />
        <Route path="venues/edit/:id" element={
          <RequireAuth>
            <EditVenuePage />
          </RequireAuth>
        } />
        <Route path="edit/show/:id" element={
          <RequireAuth>
            <EditEventPage eventType="show" />
          </RequireAuth>
        } />
        <Route path="edit/open-mic/:id" element={
          <RequireAuth>
            <EditEventPage eventType="openMic" />
          </RequireAuth>
        } />
        <Route path="edit/writers-round/:id" element={
          <RequireAuth>
            <EditEventPage eventType="writersRound" />
          </RequireAuth>
        } />
      </Route>
    </Routes>
  )
}

export default App
