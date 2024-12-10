import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { fetchProducts } from '../utils/api'; // Importamos la función de api.js

// Styled components
const ProductGrid = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 40px 200px;
  justify-content: center;
  max-width: 1200px;
  z-index: 2000;
`;

const Card = styled.div`
  width: 200px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: rgb(231, 221, 211);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-20px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 1.1em;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CardPrice = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BuyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(167, 153, 134);
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgb(150, 138, 120);
  }
`;

const CardProducts = ({ category }) => {
  const [categoryProducts, setCategoryProducts] = useState([]);  // Productos filtrados por categoría
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [error, setError] = useState(null);  // Estado de error

  useEffect(() => {
    const normalizedCategory = category.toLowerCase();  // Normalizamos la categoría a minúsculas

    // Función para cargar productos de la categoría
    const fetchCategoryProducts = async () => {
      setLoading(true);
      setError(null);  // Reiniciar el error antes de la nueva carga

      try {
        const data = await fetchProducts();  // Llamada a la API para obtener productos
        const filteredProducts = data.filter(
          product => product.category.name.toLowerCase() === normalizedCategory // Filtrar por la categoría del producto
        );
        
        if (filteredProducts.length === 0) {
          setError('No se encontraron productos para esta categoría');
        } else {
          setCategoryProducts(filteredProducts);  // Establecer los productos filtrados
        }
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);  // Finaliza la carga
      }
    };

    fetchCategoryProducts();
  }, [category]);  // Se vuelve a ejecutar cuando cambia la categoría

  // Función para manejar la adición de productos al carrito
  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('Compra')) || [];

    const productIndex = currentCart.findIndex(item => item.id === product.id);

    if (productIndex > -1) {
      currentCart[productIndex].quantity += 1;
      Swal.fire({
        icon: 'error',
        title: 'El producto ya está en el carrito',
        text: 'Este producto ya está en tu carrito.',
      });
    } else {
      currentCart.push({ ...product, quantity: 1 });
      Swal.fire({
        icon: 'success',
        title: 'Producto añadido al carrito',
        text: 'El producto ha sido añadido a tu carrito.',
      });
    }

    localStorage.setItem('Compra', JSON.stringify(currentCart));  // Guardar el carrito actualizado
  };

  if (loading) {
    return <p>Cargando productos...</p>;  // Mensaje de carga
  }

  if (error) {
    return <p>{error}</p>;  // Mensaje de error
  }

  if (categoryProducts.length === 0) {
    return <p>No hay productos para la categoría seleccionada.</p>;  // Mensaje si no hay productos
  }

  return (
    <ProductGrid>
      {categoryProducts.map((product) => (
        <Card key={product.id}>
          <CardTitle>{product.name}</CardTitle> {/* Usamos product.name en lugar de product.title */}
          <CardImage src={product.imageUrl} alt={product.name} /> {/* Usamos product.imageUrl en lugar de product.image */}
          <CardPrice>S/ {product.price}</CardPrice>
          <BuyButton onClick={() => handleAddToCart(product)}>
            <FontAwesomeIcon icon={faShoppingCart} />
            Comprar
          </BuyButton>
        </Card>
      ))}
    </ProductGrid>
  );
};

export default CardProducts;
