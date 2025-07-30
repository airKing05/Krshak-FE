import './App.css'
import Home from './pages/Home'
import FooterNavigation from './components/organisms/FooterNavigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Category from './pages/Category'
import Product from './pages/Product'
import Comparison from './pages/Comparison'
import AdminRoutes from './routes/AdminRoutes'

function App() {

  return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products/:categoryId' element={<Category />} />
          <Route path='/products/:productId' element={<Product />} />
          <Route path='/comparison' element={<Comparison />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
        <FooterNavigation />
      </BrowserRouter>
      </>
  )
}

export default App
