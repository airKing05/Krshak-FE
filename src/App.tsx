import './App.css'
import Home from './pages/Home'
import FooterNavigation from './components/organisms/FooterNavigation'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Category from './pages/Category'
import Product from './pages/Product'
import Comparison from './pages/Comparison'
import AdminRoutes from './routes/AdminRoutes'
import LoginPage from './pages/Login'
import { useEffect } from 'react'
import { getFromLocalStorage } from './utils/localStorage'
import { isTokenValid } from './utils/auth'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getFromLocalStorage('token') as string;
    const isLoggedIn = token && isTokenValid(token);

    if (location.pathname === '/login' && isLoggedIn) {
      navigate('/admin', { replace: true });
    }
  }, [navigate, location.pathname]);
  

  return (
      <>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products/:categoryId' element={<Category />} />
          <Route path='/product-details/:productId' element={<Product />} />
          <Route path='/comparison' element={<Comparison />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminRoutes />
              </ProtectedRoute>
            }
          />
        </Routes>
        <FooterNavigation />
      </>
  )
}

export default App
