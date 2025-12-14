import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './output.css';



// Components
import Navbar from './Components/common/Navbar';
import Footer from './Components/common/Footer';

// Pages
import Home from './Pages/Home';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import Dashboard from './Pages/Admin/Dashboard';
import ManageProducts from './Pages/Admin/ManageProducts';
import CartPage from './Pages/Customer/CartPage';
import Profile from './Pages/Customer/Profile';
import Order from './Pages/Customer/Order';

// Context Providers
import { AuthProvider } from './Contexts/AuthContext';
import { ProductProvider } from './Contexts/ProductContext';

// Protected Route
import ProtectedRoute from './Components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <div className="App">
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute roles={['admin']}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute roles={['admin']}>
                      <ManageProducts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute roles={['customer']}>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute roles={['customer', 'admin']}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute roles={['customer']}>
                      <Order />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <ToastContainer />
          </div>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;  