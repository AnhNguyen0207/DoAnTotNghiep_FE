import axios from "axios";
import { baseUrl } from "./productServices";

export const getStatisticsImport = async (filter) => {
  const token = localStorage.getItem("token");
  // return fetch(baseUrl + "statistics/imports",getRequest(filter, "Post", token));
  return await axios.post(`${baseUrl}/statistics/imports`, filter, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStatisticsImportExtend = async (filter) => {
  const token = localStorage.getItem("token");
  // return fetch(baseUrl + "statistics/imports/extend",getRequest(filter, "Post", token));
  return await axios.post(`${baseUrl}/statistics/imports/extend`, filter, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStatisticsInventory = async (filter) => {
  const token = localStorage.getItem("token");
  // return fetch(baseUrl + "statistics/inventories",getRequest(filter, "Post", token));
  return await axios.post(`${baseUrl}/statistics/inventories`, filter, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInventoryById = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.get(`http://localhost:8080/inventories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
