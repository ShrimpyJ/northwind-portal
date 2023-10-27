import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard'
import Product from './components/Product/Product'
import Order from './components/Order/Order'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute />} >
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/products" element={<ProtectedRoute />} >
            <Route index element={<Product />} />
          </Route>
          <Route path="/orders" element={<ProtectedRoute />} >
            <Route index element={<Order />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
