import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  height: 220px; /* Altura fija */
  overflow-y: auto; /* Permite el desplazamiento vertical si es necesario */
`;

const Summary = styled.p`
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const CarritoTotal = ({ cartItems }) => {
  const navigate = useNavigate();

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2);

  const handleComprarClick = () => {
    const cartStorage = localStorage.getItem('Compra');
    if (!cartStorage || cartStorage.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Falta agregar items para finalizar la compra',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } else {
      navigate('/PagePago');
    }
  };

  return (
    <TotalContainer>
      <Summary>Total de productos: {totalItems}</Summary>
      <Summary>Total precio: S/ {totalPrice}</Summary>
      <Button onClick={handleComprarClick}>Comprar</Button>
      <Button onClick={() => navigate('/catalog')}>Seguir comprando</Button>
    </TotalContainer>
  );
};

export default CarritoTotal;