import { ContactRequest } from "../models/ContactRequest";
import axios from "axios";

const apiURL = 'http://localhost:8080/api/v1/contact-requests';

export const createContactRequest = async (data: ContactRequest): Promise<any> => {
  try {
    const response = await axios.post(`${apiURL}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Solo retorna los datos si todo es exitoso
  } catch (error: any) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error en la respuesta del servidor:', error.response.data);
      throw new Error(error.response.data.message || 'Error en la solicitud');
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      console.error('No hubo respuesta del servidor:', error.request);
      throw new Error('No se pudo contactar al servidor. Inténtalo de nuevo más tarde.');
    } else {
      // Otro tipo de error (por ejemplo, al configurar la solicitud)
      console.error('Error al hacer la solicitud:', error.message);
      throw new Error('Error inesperado. Inténtalo de nuevo.');
    }
  }
};
