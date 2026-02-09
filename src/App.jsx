
import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { Clients } from './components/clients/Clients'
import { CreateArtist } from './components/create/CreateArtist'
import { EditArtist } from './components/edit/EditArtist'
import { CreateBand } from './components/create/CreateBand'
import { EditBand } from './components/edit/EditBand'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Clients />} />
      <Route path='create-artist' element={<CreateArtist />} />
      <Route path='edit-artist/:artistId' element={<EditArtist />} />
      <Route path='create-band' element={<CreateBand />} />
      <Route path='edit-band/:bandId' element={<EditBand />} />
    </Routes>
  )
}

export default App
