import styled from 'styled-components';

const ImageRowWrapper = styled.div`
  position: relative;
  height: 383px; /* Asegura que el contenedor use todo el alto del viewport */
  width: 100%; /* Ocupa todo el ancho del viewport */
  overflow: hidden;
  cursor: pointer;

  img{
  position:relative;
  top:-800px;
  z-index: 0;
  }


  &:hover img {
    transform: scale(1.3); /* Amplía la imagen */
    filter: brightness(50%); /* Reduce el brillo de la imagen, haciendo que se vea más oscura */
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: auto;
  min-height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, opacity 0.5s ease;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  opacity: 0;
  transition: opacity 0.5s ease;
    z-index: 1; /* Asegura que el overlay de texto esté sobre la imagen */

  h2 {
    font-size: 4rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }

  /* Mostrar el overlay de texto en hover */
  ${ImageRowWrapper}:hover & {
    opacity: 1;
  }
`;


const ImageRow = ({ imgSrc, title, subtitle }) => {
    console.log("imgSrc:", imgSrc); // Verifica si está recibiendo la imagen
    console.log("title:", title);   // Verifica si está recibiendo el título
    console.log("subtitle:", subtitle); // Verifica si está recibiendo el subtítulo
  
    return (
      <ImageRowWrapper>
        <BackgroundImage src={imgSrc} alt={title} />
        <TextOverlay>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </TextOverlay>
      </ImageRowWrapper>
    );
  };
export default ImageRow;
