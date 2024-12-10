import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import logoImage from '../assets/logoImagotipo.png'; // Ruta de la imagen del logo

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admins/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username, // Usuario proporcionado
          password, // Contraseña proporcionada
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
  
        // Guardar el nombre de usuario en el localStorage
        localStorage.setItem('Admins', username);  // Guardar el nombre de usuario con el key 'Admins'
  
        // Redirigir a la página de administradores
        navigate('/dashboardAdmins');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError(true);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };
  

  return (
    <LoginContainer>
      <Logo src={logoImage} alt="logo" />
      <Title>Iniciar Sesión</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="username">Usuario</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
        <ButtonContainer>
          <Button type="button" onClick={() => navigate('/about')}>
            Regresar
          </Button>
          <Button type="submit">Entrar</Button>
        </ButtonContainer>
      </Form>

      {error && Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña incorrectos.',
      }).then(() => {
          setTimeout(() => {
              window.location.reload();
            }, 2000); // 3 segundos de retraso
        })};
    </LoginContainer>
  );
};

export default LoginPage;

// Estilos con styled-components
const LoginContainer = styled.div`
  width: 300px;
  margin: auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #8b5e34; /* Color café oscuro */
  cursor: pointer;

  &:hover {
    background-color: #67451f; /* Color café más oscuro en hover */
  }
`;
