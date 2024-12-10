import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Ícono de cerrar sesión
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Header
const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  background-color: hsl(0, 0%, 92%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  color: black;
`;

const LogoutIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: black;

  &:hover {
    color: red;
  }
`;

// Footer
const FooterWrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 50px;
  background-color: hsl(0, 0%, 92%);
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  box-sizing: border-box;
  z-index: 10;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
`;

const FooterText = styled.div`
  font-family: "Red Hat Display", sans-serif;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

// Cuerpo de la página
const BodyWrapper = styled.main`
  margin-top: 100px; /* Para que no se solape con el header fijo */
  text-align: center;
  padding: 40px 20px;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const DashboardAdmins = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Verificamos si existe el "Admin" en localStorage
  useEffect(() => {
    const admin = localStorage.getItem("Admins");
    if (!admin) {
      navigate("/"); // Si no existe, redirige a la página de inicio
    } else {
      fetchProducts();
    }
  }, [navigate]);

  // Obtener todos los productos del backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <HeaderWrapper>
        <HeaderTitle>Página de Administrador</HeaderTitle>
        <LogoutIcon
          onClick={() => {
            localStorage.removeItem("Admin");
            navigate("/");
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </LogoutIcon>
      </HeaderWrapper>

      {/* Cuerpo de la página */}
      <BodyWrapper>
        <h2>Lista de Productos</h2>
        <ProductTable>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </BodyWrapper>

      {/* Footer */}
      <FooterWrapper>
        <FooterContent>
          <FooterText>© 2024 Administrador</FooterText>
        </FooterContent>
      </FooterWrapper>
    </div>
  );
};

export default DashboardAdmins;
