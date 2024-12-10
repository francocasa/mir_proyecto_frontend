// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js'; // Importar Elements de Stripe
import { loadStripe } from '@stripe/stripe-js'; // Importar loadStripe para cargar la clave pública

// Páginas
import Home from './pages/Home';
import Us from './pages/Nosotros';
import Products from './pages/Products';
import CatalogPage from './pages/CatalogPage';
import CategoryPagePlaceholder from './pages/CategoryPagePlaceholder';
import Carrito from './pages/carrito';
import Login from './pages/LoginPage';
import PagePago from './pages/PagePago'; // Página de pago
import DashboardAdmins from './pages/dashboardadmin';


// Cargar Stripe con tu clave pública
const stripePromise = loadStripe('pk_test_51QCrcLIYFcT1gpXszrAcB7urrQ2OK4wOLMXYTI7EzmIUrv2veHIdWVJ3FmbWcNySCwga03TtNlZANewJOi3DPKW300OYcsb1Oa'); // Reemplazar con tu clave pública de Stripe

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<Us />} />
        <Route path="/products" element={<Products />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:category" element={<CategoryPagePlaceholder />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/dashboardAdmins" element={<DashboardAdmins />} />
        <Route path="/pagepago" element={<Elements stripe={stripePromise}><PagePago /></Elements>} /> 
        {/* Nueva ruta para la página de pago */}
      </Routes>
    </Router>
  );
};

export default App;
