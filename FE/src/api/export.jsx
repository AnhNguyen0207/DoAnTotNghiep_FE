import axios from "axios";

const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};
export const getExport = async (params) => {
  return (
    await axios.get(`http://localhost:8080/exports/getExportByAll`, {
      params: params,
      headers,
    })
  ).data;
};
export const createExport = async (item) => {
  return await axios.post(`http://localhost:8080/exports`, item, { headers });
};
export const updateExport = async (id, item) => {
  return await axios.patch(`http://localhost:8080/exports/${id}`, item, {
    headers,
  });
};
export const findExportById = async (id) => {
  return (await axios.get(`http://localhost:8080/exports/${id}`, { headers }))
    .data;
};
export const addExportByInventory = async (id, item) => {
  return (
    await axios.put(`http://localhost:8080/exports/add/${id}`, item, {
      headers,
    })
  ).data;
};
export const importExportByInventory = async (id, item) => {
  return (
    await axios.put(`http://localhost:8080/exports/import/${id}`, item, {
      headers,
    })
  ).data;
};
