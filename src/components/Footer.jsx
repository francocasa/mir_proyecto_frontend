import styled from 'styled-components';
import { FaFacebookF, FaInstagram } from 'react-icons/fa'; // Librería de iconos
import { Link } from 'react-router-dom'; // Importa el Link para la navegación

const FooterWrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: flex-end; /* Alinea el contenido al final del contenedor (derecha) */
  align-items: center;
  padding: 20px 50px;
  background-color: hsl(0, 0%, 92%);
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* Asegura que el footer se posicione correctamente */
  box-sizing: border-box; /* Incluye padding en el cálculo del ancho total */
    z-index: 10;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center; /* Alinea verticalmente el texto con los iconos */
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center; /* Alinea verticalmente los iconos con el texto */
  margin-left: 15px; /* Espacio entre el texto y los iconos */

  a {
    margin: 0 10px;
    color: black;
    font-size: 1.5rem;
    text-decoration: none;

    &:hover {
      color: grey;
    }
  }
`;

const ContactText = styled.div`
  font-family: 'Red Hat Display', sans-serif;
  font-size: 1rem;
  display: flex;
  align-items: center; /* Alinea verticalmente el texto con los iconos */
`;

const LoginIcon = styled.img`
  width: 30px; /* Ajusta el tamaño del icono según sea necesario */
  height: auto;
  cursor: pointer;
  margin-left: 20px; /* Espacio entre los iconos de redes sociales y el icono de login */
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <ContactText>Contáctanos</ContactText>
        <SocialIcons>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <Link to="/login">
            <LoginIcon src="/assets/login.png" alt="Login" />
          </Link>
        </SocialIcons>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
