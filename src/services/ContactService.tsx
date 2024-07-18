import { Contact } from "../models/Contact";
import axios from "axios";

const apiURL = 'http://localhost:8080';

export const createContact = async (data: Contact): Promise<any> => {
  try {
    const response = await axios.post(`${apiURL}/contact-requests/createConversation`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('La respuesta de la red no fue satisfactoria');
  }
};

export const editContact = async (data: Contact, id: string): Promise<any> => {
  try {
    const response = await axios.put(`${apiURL}/contact-requests/updateConversationById/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('La respuesta de la red no fue satisfactoria');
  }
};

export const vizualizarContact = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`${apiURL}/contact-requests/getConversationById/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('La respuesta de la red no fue satisfactoria');
  }
};