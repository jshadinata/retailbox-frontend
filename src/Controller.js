import axios from "axios";
import { API_URL } from "./config.js";

export const CompanyController = {
  getList: async () => {
    const url = API_URL + "/companies";
    const resp = await axios.get(url);
    return resp;
  },

  getById: async id => {
    const url = API_URL + "/companies/get/" + id;
    const resp = await axios.get(url);
    return resp;
  },

  add: async ({ name, address, telephone, email, website, apiKey }) => {
    const url = API_URL + "/companies/add";
    const data = {
      name: name,
      address: address,
      telephone: telephone,
      email: email,
      website: website,
      api_key: apiKey
    };
    const resp = await axios.post(url, data);
    return resp;
  },

  update: async (id, { name, address, telephone, email, website, apiKey }) => {
    const url = API_URL + "/companies/edit/" + id;
    const data = {
      name: name,
      address: address,
      telephone: telephone,
      email: email,
      website: website,
      api_key: apiKey
    };
    const resp = await axios.post(url, data);
    return resp;
  }
};
