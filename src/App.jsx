
import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { Clients } from './components/clients/Clients'
import { CreateArtist } from './components/create/CreateArtist'

function App() {

  return (
    <Routes>
      <Route path='/' element={<>
        <Outlet />
      </>
      }>
        <Route path='clients'>
          <Route index element={<Clients />} />
          <Route path='create-artist' element={<CreateArtist />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
