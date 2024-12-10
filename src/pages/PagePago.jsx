// src/pages/Pedido.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: auto;
  padding: 20px;
  margin-top: 80px; /* Para dar espacio debajo del Header */
  margin-bottom: 80px; /* Para dar espacio encima del Footer */
`;

const FormSection = styled.div`
  width: 45%;
  padding: 20px;
  box-sizing: border-box;
`;

const ImageSection = styled.div`
  width: 45%;
  position: relative;
  left: -40px;
  height: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(150, 138, 120);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgb(231, 211, 111);
  }
`;

const ProductSummary = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-top: 1px solid #ddd;
  font-size: 14px;
`;

const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Pedido = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    celular: "",
    correo: "",
    direccion: "",
  });
  const [cartItems, setCartItems] = useState([]);

  // Obtener los artículos del carrito desde localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("Compra")) || [];
    setCartItems(storedItems);
  }, []);

  // Calcular el total de productos y el precio
  const totalItems = cartItems.length;
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombres, celular, correo, direccion } = formData;
    // Crear el mensaje con formato
    const message = `
*Pedido Nuevo*

*Datos del Cliente:*
- *Nombre:* ${nombres}
- *Celular:* ${celular}
- *Correo:* ${correo}
- *Dirección:* ${direccion}

*Resumen de la Compra:*
${cartItems
  .map(
    (item) =>
      `- ${item.name} (x${item.quantity || 1}) - S/ ${item.price.toFixed(2)}`
  )
  .join("\n")}

*Total:* S/ ${totalPrice}
    `.trim(); // Este es el mensaje con formato

    // Limpiar el carrito después de la compra
    localStorage.clear();

    // Redirigir al usuario a WhatsApp con el mensaje
    window.open(
      `https://wa.me/51940467555?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    // Recargar la página actual después de abrir WhatsApp
    window.location.reload();
  };

  return (
    <div>
      <Header /> {/* Colocamos Header al principio de la página */}
      <Container>
        <FormSection>
          <h2>Completa tus datos para el pago:</h2>
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <InputLabel>Nombres y Apellidos:</InputLabel>
              <Input
                type="text"
                name="nombres"
                placeholder="Nombres y Apellidos"
                value={formData.nombres}
                onChange={handleChange}
                required
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Celular:</InputLabel>
              <Input
                type="text"
                name="celular"
                placeholder="Celular"
                value={formData.celular}
                onChange={handleChange}
                required
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Correo:</InputLabel>
              <Input
                type="email"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Dirección:</InputLabel>
              <Input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </InputContainer>

            <Button type="submit">Pagar S/ {totalPrice}</Button>
          </Form>
        </FormSection>

        <ImageSection>
          <div>
            <h3>Resumen de la compra</h3>
            <p>Total de productos: {totalItems}</p>
            <p>Total precio: S/ {totalPrice}</p>

            {/* Mostrar los productos del carrito */}
            <ProductSummary>
              {cartItems.map((item, index) => (
                <ProductRow key={index}>
                  <div>
                    <strong>Nombre:</strong> {item.name}
                  </div>
                  <div>
                    <strong>Cantidad:</strong> {item.quantity}
                  </div>
                  <div>
                    <strong>Precio unitario:</strong> S/ {item.price}
                  </div>
                </ProductRow>
              ))}
            </ProductSummary>
          </div>
        </ImageSection>
      </Container>
      <Footer /> {/* Colocamos Footer al final de la página */}
    </div>
  );
};

export default Pedido;
