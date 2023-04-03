import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Book } from './pages/Book'
import { Add } from './pages/Add'
import { Update } from './pages/Update'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Book />} />
        <Route path='/add' element={<Add />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
