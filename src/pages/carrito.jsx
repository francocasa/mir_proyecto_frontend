// src/pages/Carrito.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarritoCard from '../components/carrito-card'; // Asegúrate de que el nombre del componente sea correcto (CarritoCard en lugar de carrito-card)
import CarritoTotal from '../components/carrito-total';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const CarritoContainer = styled.div`
  display: flex;
  width: 100%;
`;

const TotalContainer = styled.div`
  width: 20%;
  height: 380px; /* Altura fija */
  margin-left: 20px; /* Espacio entre la lista de productos y el total */
`;

const CarritoPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('Compra')) || [];
    setCartItems(storedItems);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('Compra', JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('Compra', JSON.stringify(updatedItems));
  };

  return (
    <div>
      <Header />
      <Container>
        <main style={{ flex: 1, position: 'relative', top: '80px', marginBottom: '100px' }}>
          <CarritoContainer>
            <div style={{ width: '80%' }}>
              {cartItems.map(item => (
                <CarritoCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
            <TotalContainer>
              <CarritoTotal cartItems={cartItems} />
            </TotalContainer>
          </CarritoContainer>
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default CarritoPage;