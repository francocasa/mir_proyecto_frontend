// src/components/ImageColumn.jsx
import styled from 'styled-components';

const ImageColumnWrapper = styled.div`
  display: flex;
  width: 100%;
  position:relative;
  top:20px;
  background-color:rgb(231,221,211);
  gap: 8em; /* Espacio entre los elementos de la columna de imágenes */
  margin: 150px 40px 20px; /* Ajusta el margen según sea necesario */
    box-sizing: border-box; /* Incluye padding en el cálculo del ancho total */
`;

const ImageWrapper = styled.div`
  flex: 1; /* Permite que cada imagen ocupe una porción igual del contenedor */
  max-width: 330px; /* Ancho máximo para cada imagen */
  height: 350px;
  overflow: hidden;
  transition: width 0.5s ease;
  
  img {
    width: 100%;
    height: 100%; /* Mantiene la altura del contenedor */
    object-fit: cover; /* Asegura que la imagen cubra el área sin distorsión */
    transition: transform 0.5s ease;
  }
  
  &:hover {
    flex: 1 0 450px; /* Aumenta el ancho en el hover sin afectar el layout de otros elementos */
    
    img {
      transform: scale(1.2); /* Escala la imagen en hover */
    }
  }
`;

const ImageColumn = ({ images }) => {
  return (
    <ImageColumnWrapper>
      {images.map((image, index) => (
        <ImageWrapper key={index}>
          <img src={image} alt={`Imagen ${index + 1}`} />
        </ImageWrapper>
      ))}
    </ImageColumnWrapper>
  );
};

export default ImageColumn;
