import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import Header from './components/Header/Header'
import CarDetailsPage from './pages/CarDetailsPage/CarDetailsPage'
import { Toaster } from 'react-hot-toast'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
function App() {

  return (
    <div className="wrapper">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/catalog" element={<CatalogPage/>}/>
        <Route path="/catalog/:id" element={<CarDetailsPage/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
