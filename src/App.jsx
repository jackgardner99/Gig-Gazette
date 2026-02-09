
import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { Clients } from './components/clients/Clients'
import { CreateArtist } from './components/create/CreateArtist'
import { EditArtist } from './components/edit/EditArtist'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Clients />} />
      <Route path='create-artist' element={<CreateArtist />} />
      <Route path='edit-artist/:artistId' element={<EditArtist />} />
    </Routes>
  )
}

export default App
