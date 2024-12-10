import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardProducts from '../components/CardProducts';
import { useParams } from 'react-router-dom';
import Slide2 from '../components/Slide2';
import { useNavigate } from 'react-router-dom';

const CategoryPagePlaceholder = () => {
  const { category } = useParams(); // Obtener la categoría desde la URL
  const navigate = useNavigate();

  const handleCategoryChange = (newCategory) => {
    navigate(`/catalog/${newCategory.toLowerCase()}`);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Slide2 onCategoryChange={handleCategoryChange} activeCategory={category} />
      <main style={{ flex: 1, position: 'relative', top: '140px', marginBottom: '200px' }}>
        <h1>Página de Categoría: {category}</h1>
        {/* Muestra los productos de la categoría */}
        <CardProducts category={category} />
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPagePlaceholder;