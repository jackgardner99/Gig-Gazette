
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/auth/Login'
import { ApplicationView } from './components/views/ApplicationView'
import { Authorized } from './components/views/Authorized'


function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route path='*' element={
        <Authorized>
          <ApplicationView />
        </Authorized>
      } />
    </Routes>
  )
}

export default App
