import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Ícono de cerrar sesión
import Swal from "sweetalert2";
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

const Button = styled.button`
  padding: 5px 10px;
  margin: 5px;
  background-color: #8b5e34;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #67451f;
  }
`;

// Modal para editar
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ModalButton = styled.button`
  padding: 10px;
  margin: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  padding: 10px;
  margin: 5px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #da190b;
  }
`;

const DashboardAdmins = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    stock: "",
    sizeId: "",
    brandId: "",
    materialId: "",
    categoryId: "",
    imageUrl: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false); // Control del modal
  const navigate = useNavigate();

  // Verificamos si existe el "Admin" en localStorage
  useEffect(() => {
    const admin = localStorage.getItem("Admins");
    if (!admin) {
      navigate("/"); // Si no existe, redirige a la página de inicio
    } else {
      fetchOrders();
    }
  }, [navigate]);

  // Obtener todos los productos del backend
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Editar una orden
  const handleEdit = (order) => {
    setFormData({ ...order });
    setIsModalVisible(true); // Mostrar el modal
  };

  // Cancelar la edición
  const handleCancel = () => {
    setIsModalVisible(false); // Cerrar el modal
  };

  // Enviar los cambios de edición
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Crea una copia de los datos del formulario
    let dataToSend = { ...formData };
    // Eliminar campos vacíos o no modificados
    Object.keys(dataToSend).forEach((key) => {
      if (dataToSend[key] === "" || dataToSend[key] === undefined) {
        delete dataToSend[key];
      }
    });

    try {
      console.log("formData.id");
      console.log(formData.id);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/orders/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend), // Solo los campos que han cambiado
        }
      );

      const result = await response.json();

      // Manejamos la respuesta
      if (response.ok) {
        Swal.fire("Éxito", result.message, "success");
        fetchOrders(); // Refresca la lista de ordenes
        setIsModalVisible(false); // Cierra el modal
      } else {
        Swal.fire(
          "Error",
          result.message || "Hubo un error al modificar el producto",
          "error"
        );
      }
    } catch (error) {
      console.error("Error al modificar la orden", error);
      Swal.fire("Error", "Hubo un problema al modificar la orden", "error");
    }
  };

  // Eliminar orden
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await fetch(`${apiBaseUrl}/orders/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire("Eliminado", "Producto eliminado correctamente", "success");
          fetchOrders(); // Refresca la lista de ordenes
        } else {
          Swal.fire("Error", "Hubo un problema al eliminar la orden", "error");
        }
      }
    } catch (error) {
      console.error("Error al eliminar la orden:", error);
      Swal.fire("Error", "Hubo un problema al eliminarla orden", "error");
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
        <h2>Lista de Ordenes</h2>
        <ProductTable>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
                <td>
                  <Button onClick={() => handleEdit(order)}>Modificar</Button>
                  <Button onClick={() => handleDelete(order.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </BodyWrapper>

      {/* Modal para editar el producto */}
      <ModalWrapper isVisible={isModalVisible}>
        <ModalContent>
          <h3>Editar Orden</h3>
          <form onSubmit={handleSubmit}>
            <Label>ID</Label>
            <InputField
              type="text"
              value={formData.id}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nombre"
            />
            <Label>Nombre</Label>
            <InputField
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nombre"
            />
            <Label>Precio Total</Label>
            <InputField
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseInt(e.target.value) })
              }
              placeholder="Precio"
            />
            <Label>Estado</Label>
            <InputField
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Descripción"
            />
            <Label>Productos</Label>

            {/* Listado de productos */}

            <ModalButton type="submit">Modificar</ModalButton>
            <CancelButton type="button" onClick={handleCancel}>
              Cancelar
            </CancelButton>
          </form>
        </ModalContent>
      </ModalWrapper>

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
