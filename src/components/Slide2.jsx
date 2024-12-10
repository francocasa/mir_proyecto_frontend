import styled from 'styled-components';

const SlideWrapper = styled.div`
  position: fixed; /* Se queda en la parte superior al hacer scroll */
  top: 80px; /* Justo debajo del Header */
  left: 0;
  width: 100%;
  height: 70px; /* Ajusta la altura según sea necesario */
  background-color: rgb(167, 153, 134);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 20; /* Asegura que esté por encima del contenido */
`;

const Button = styled.button`
  background: none;
  border: none;
  font-family: 'Red Hat Display', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease; /* Agrega una transición suave al cambio de tamaño */

  &:hover {
    transform: scale(1.5); /* Ajusta el tamaño en hover */
    border: 2px solid white; /* Muestra el borde en hover */
  }

  &:focus {
    outline: none; /* Elimina el borde de enfoque predeterminado */
  }

  /* Asegúrate de que no haya ningún estilo adicional cuando el botón está activo */
`;

const Slide2 = ({ onCategoryChange, activeCategory }) => {
  return (
    <SlideWrapper>
      <Button
        onClick={() => onCategoryChange('conjuntos')}
        style={{ border: activeCategory === 'conjuntos' ? 'none' : 'none' }}
      >
        Conjuntos
      </Button>
      <Button
        onClick={() => onCategoryChange('faldas')}
        style={{ border: activeCategory === 'faldas' ? 'none' : 'none' }}
      >
        Faldas
      </Button>
      <Button
        onClick={() => onCategoryChange('bikinis')}
        style={{ border: activeCategory === 'bikinis' ? 'none' : 'none' }}
      >
        Bikinis
      </Button>
      <Button
        onClick={() => onCategoryChange('tops')}
        style={{ border: activeCategory === 'tops' ? 'none' : 'none' }}
      >
        Tops
      </Button>
    </SlideWrapper>
  );
};

export default Slide2;