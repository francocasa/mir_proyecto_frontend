// src/pages/CatalogPage.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import Slide from '../components/Slide';
import ImageColumn from '../components/ImageColumn';
import { useNavigate } from 'react-router-dom'; // Para redirección
import styled from 'styled-components';

const imageSources = {
  bikinis: [
    '/assets/Prendas/bikini1.png',
    '/assets/Prendas/bikini2.png',
    '/assets/Prendas/bikini3.jpg'
  ],
  faldas: [
    '/assets/Prendas/falda4.jfif',
    '/assets/Prendas/falda3.jfif',
    '/assets/Prendas/falda2.jpg'
  ],
  conjuntos: [
    '/assets/Prendas/prendaInverno2.png',
    '/assets/Prendas/prendaInverno8.png',
    '/assets/Prendas/prendaInverno5.png'
  ],
  tops: [
    '/assets/Prendas/top4.jpg',
    '/assets/Prendas/top1.jpg',
    '/assets/Prendas/top2.jpg'
  ]
};

// Estilo para el botón con hover
const StyledButton = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid black;
  border-radius: 2.5px;
  border:white;
  color:white;
  padding: 10px 20px;
  background-color: rgb(167,153,134);
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease; /* Agrega una transición suave */

  &:hover {
    transform: scale(1.4); /* Escala el botón al pasar el ratón sobre él */
    border: 1px solid white;
  }
`;

const CatalogPage = () => {
  const [category, setCategory] = useState('bikinis');
  const navigate = useNavigate();

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleViewMore = () => {
    navigate(`/catalog/${category}`);
  };

  return (
    <>
      <Header />
      <Slide onCategoryChange={handleCategoryChange} activeCategory={category} />
      <main style={{ marginTop: '150px', textAlign: 'center', backgroundColor: 'rgb(231,221,211)', color: 'white'}}> {/* Ajusta el margin-top para evitar que el contenido se oculte debajo del Header y el Slide */}
        <ImageColumn images={imageSources[category]} />
        <StyledButton onClick={handleViewMore}>Ver más</StyledButton>
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
