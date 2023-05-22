import axios from "axios";
import { baseUrl } from "../constant";

const saveSankey = async (data) => {
  try {
    const response = await axios.post(baseUrl + "savesankey", data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const fetchServices = {
  saveSankey,
};
