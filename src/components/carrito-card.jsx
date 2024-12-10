import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  height: 135px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  position: relative;
`;

const CardImage = styled.img`
  width: 100px;
  height: auto;
  margin-right: 10px;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1em;
`;

const CardPrice = styled.p`
  margin: 5px 0;
  font-weight: bold;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;

  button {
    margin: 0 5px;
    padding: 5px;
    border: none;
    background-color: #ddd;
    cursor: pointer;
    border-radius: 5px;
  }

  input {
    width: 40px;
    text-align: center;
  }
`;

const RemoveButton = styled.button`
  background-color: brown;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  position: absolute;
  left: 300px;
  bottom: 45px;
  width: 80px;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    background-color: darkred;
  }
`;

const CarritoCard = ({ item, onRemove, onQuantityChange }) => {
  // Normalizamos los datos para tener una estructura consistente
  const normalizedItem = {
    id: item.id,
    title: item.name, // Usamos 'name' del backend para 'title'
    image: item.imageUrl, // Usamos 'imageUrl' del backend para 'image'
    price: item.price,
    quantity: item.quantity || 1, // Si no tiene cantidad, por defecto es 1
  };

  const [quantity, setQuantity] = useState(normalizedItem.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    setQuantity(newQuantity);
    onQuantityChange(normalizedItem.id, newQuantity);
  };

  return (
    <Card>
      <CardImage src={normalizedItem.image} alt={normalizedItem.title} />
      <CardContent>
        <CardTitle>{normalizedItem.title}</CardTitle>
        <CardPrice>S/ {normalizedItem.price}</CardPrice>
        <QuantityControls>
          <button onClick={() => handleQuantityChange({ target: { value: quantity - 1 } })}>-</button>
          <input type="number" value={quantity} onChange={handleQuantityChange} />
          <button onClick={() => handleQuantityChange({ target: { value: quantity + 1 } })}>+</button>
        </QuantityControls>
      </CardContent>
      <RemoveButton onClick={() => onRemove(normalizedItem.id)}>Eliminar</RemoveButton>
    </Card>
  );
};

export default CarritoCard;
