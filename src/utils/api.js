// src/utils/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Acceso a la URL base

// Función para obtener los productos
export const fetchProducts = async () => {
  try {
    const url = `${API_BASE_URL}/products`; // Concatenamos el endpoint
    console.log("URL solicitada:", url); // Log de la URL construida

    const response = await fetch(url); // Llamada a la API

    console.log("Respuesta de la API:", response); // Log de la respuesta completa

    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }

    const data = await response.json(); // Intentamos convertir la respuesta en JSON
    console.log("Datos recibidos:", data); // Log de los datos recibidos

    return data; // Asegúrate de que aquí se retorna el array o datos correctos
  } catch (error) {
    console.error("Error fetching products: ", error); // Log del error

    return []; // En caso de error, devuelve un array vacío o maneja el error de otra manera
  }
};
