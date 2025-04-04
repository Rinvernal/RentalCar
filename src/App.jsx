import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import Header from './components/Header/Header'
import CarDetailsPage from './pages/CarDetailsPage/CarDetailsPage'
function App() {

  return (
    <div className="wrapper">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/catalog" element={<CatalogPage/>}/>
        <Route path="/catalog/:id" element={<CarDetailsPage/>}/>
      </Routes>
    </div>
  )
}

export default App
