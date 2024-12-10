import React, { useState, useEffect } from 'react';
import CarritoTotal from '../components/carrito-total'; // Componente que muestra el total del carrito
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js'; // Cargar Stripe
import { Elements } from '@stripe/react-stripe-js'; // Usar los componentes de Stripe

const stripePromise = loadStripe('tu-public-key-de-stripe'); // Cambia con tu public key de Stripe

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 20px;
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
    background-color: rgb(231,211,111);
  }
`;

const Pedido = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    celular: '',
    correo: '',
    direccion: ''
  });
  const [cartItems, setCartItems] = useState([]);
  const [clientSecret, setClientSecret] = useState(''); // Guardar el client secret para Stripe

  // Obtener los artículos del carrito desde localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('Compra')) || [];
    setCartItems(storedItems);
    fetchClientSecret(storedItems); // Obtener el clientSecret desde el backend
  }, []);

  // Obtener el client secret para realizar el pago
  const fetchClientSecret = async (cartItems) => {
    const response = await fetch('/api/create-payment-intent', {  // Asegúrate de que esta API esté implementada en tu backend
      method: 'POST',
      body: JSON.stringify({ cartItems }),
      headers: { 'Content-Type': 'application/json' },
    });

    const { clientSecret } = await response.json();
    setClientSecret(clientSecret); // Guardar el clientSecret que Stripe nos da
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica de pago con Stripe
    const { nombres, celular, correo, direccion } = formData;

    const message = `
      *Pedido Nuevo*
      Nombres y Apellidos: ${nombres}
      Celular: ${celular}
      Correo: ${correo}
      Dirección: ${direccion}
    `.trim(); // Enviar la información por WhatsApp

    // Procesamos el pago con Stripe
    const { error } = await stripePromise.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement, // cardElement es el elemento que contiene la tarjeta de crédito
        billing_details: {
          name: nombres,
          email: correo,
          address: { line1: direccion }
        }
      }
    });

    if (error) {
      console.log(error.message);
    } else {
      // Si el pago es exitoso, limpiamos el carrito y redirigimos
      localStorage.clear();
      window.location.href = `https://wa.me/51940467555?text=${encodeURIComponent(message)}`;
    }
  };

  return (
    <Container>
      <FormSection>
        <h2>Completar datos para el pago:</h2>
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

          {/* Aquí se va a integrar el formulario de Stripe */}
          <div>
            <h3>Información de pago</h3>
            {/* Aquí se agrega el Stripe Elements Form */}
          </div>

          <Button type="submit" disabled={!clientSecret}>Pagar</Button>
        </Form>
      </FormSection>

      <ImageSection>
        {/* Mostrar el total del carrito con CarritoTotal */}
        <CarritoTotal cartItems={cartItems} />
      </ImageSection>
    </Container>
  );
};

export default Pedido;
