import axios from "axios";
import { baseUrl, getRequest } from "./productServices";
var token = localStorage.getItem("token");
const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};
export const getStatisticsImport = (filter) => {
  return fetch(
    baseUrl + "statistics/imports",
    getRequest(filter, "Post", token)
  );
};
export const getStatisticsImportExtend = (filter) => {
  return fetch(
    baseUrl + "statistics/imports/extend",
    getRequest(filter, "Post", token)
  );
};
export const getStatisticsInventory = (filter) => {
  return fetch(
    baseUrl + "statistics/inventories",
    getRequest(filter, "Post", token)
  );
};
export const getInventoryById = async (id) => {
  return await axios.get(`http://localhost:8080/inventories/${id}`, {
    headers,
  });
};
