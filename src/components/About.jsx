import styled from 'styled-components';
import logoImagotipo from '../assets/logoImagotipo.png';
import misionImg from '../assets/mision.png';
import visionImg from '../assets/vision.png';

const Container = styled.div`
background-color:rgb(231,221,211);
  padding: 20px;
  box-sizing: border-box;
`;

const Section = styled.section`
  margin-bottom: 20px;
  transition: transform 0.3s ease; /* Agrega una transición suave para el hover */
  

`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const LeftContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  margin-left: 40px;
  margin-top: 20px;
  text-align: center;
    &:hover {
    transform: scale(1.1); /* Escala el contenedor al pasar el mouse */
  }
`;

const RightContainer = styled.div`
  flex: 1;
  img {
    max-width: 100%;
    height: auto;
  }
    &:hover {
    transform: scale(1.1); /* Escala el contenedor al pasar el mouse */  
`;

const TwoColumnsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Column = styled.div`
  flex: 1;
  margin: 0 10px;
    &:hover {
    transform: scale(1.02); /* Escala el contenedor al pasar el mouse */
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
    &:hover {
    transform: scale(1.1); /* Escala el contenedor al pasar el mouse */
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
  padding-left: 20px;
  
`;

const ImageWithText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  img {
    margin-right: 15px;
    max-width: 100px;
    height: auto;
  }
`;

const MapSection = styled.div`
  iframe {
    width: 100%;
    height: 450px;
    border: 0;
  }
`;

const About = () => {
  return (
    <Container>
      {/* Sección Superior */}
      <Section>
        <TopSection>
          <LeftContainer>
            <h1>¡Bienvenidos a Sirenah!</h1>
            <Paragraph>
              Tu destino definitivo para el estilo de verano en el hermoso Perú. En SIRENAH, nos enorgullece ofrecer una amplia selección de ropa de verano que captura la esencia vibrante y la energía del clima soleado de nuestro país. Nos esforzamos por ofrecer un servicio personalizado y una atención al cliente excepcional en cada paso del camino. Ya sea que estés buscando actualizar tu guardarropa de verano o abastecer tu propia tienda con nuestras colecciones exclusivas, estamos aquí para ayudarte a encontrar exactamente lo que necesitas.
            </Paragraph>
          </LeftContainer>
          <RightContainer>
            <img src={logoImagotipo} alt="Logo Sirenah" />
          </RightContainer>
        </TopSection>
      </Section>

      {/* Sección Misión y Visión */}
      <Section>
        <TwoColumnsSection>
          <Column>
            <ImageWithText>
              <img src={misionImg} alt="Misión" />
              <div>
                <Title>Misión</Title>
                <Paragraph>
                  Nuestra misión es inspirar la confianza y la felicidad a través de la moda, nos esforzamos por ofrecer una amplia selección de ropa de verano de alta calidad a precios accesibles, capturando la esencia vibrante y la energía del clima soleado del Perú. Valoramos la satisfacción del cliente sobre todo y nos comprometemos a proporcionar un servicio personalizado y una atención al cliente excepcional en cada paso del camino.
                </Paragraph>
              </div>
            </ImageWithText>
          </Column>
          <Column>
            <ImageWithText>
              <img src={visionImg} alt="Visión" />
              <div>
                <Title>Visión</Title>
                <Paragraph>
                  Nuestra visión es convertirnos en el destino definitivo para el estilo de verano en el Perú, buscamos ser reconocidos para aquellos que buscan prendas frescas y modernas para disfrutar del sol y la playa. Nos esforzamos por seguir siendo líderes en la industria de la moda veraniega, ofreciendo una experiencia de compra sin igual donde la calidad, el estilo y la comodidad se fusionen en cada prenda que ofrecemos.
                </Paragraph>
              </div>
            </ImageWithText>
          </Column>
        </TwoColumnsSection>
      </Section>

      {/* Sección de Mapa */}
      <Section>
        <Title>Visítanos</Title>
        <MapSection>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62448168.180373676!2d-144.76509779999998!3d-17.192879599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904ce559defbe011%3A0x70bc521b24c3c92!2sSirena%20Moda%20Mujer!5e0!3m2!1ses!2spe!4v1726539341545!5m2!1ses!2spe" 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </MapSection>
      </Section>
    </Container>
  );
};

export default About;
