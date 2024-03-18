import axios from "axios";

export const getExport = async (params) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/exports/getExportByAll`, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
export const createExport = async (item) => {
  const token = localStorage.getItem("token");
  return await axios.post(`http://localhost:8080/exports`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateExport = async (id, item) => {
  const token = localStorage.getItem("token");
  return await axios.patch(`http://localhost:8080/exports/${id}`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const findExportById = async (id) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/exports/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
export const addExportByInventory = async (id, item) => {
  const token = localStorage.getItem("token");
  return (
    await axios.put(`http://localhost:8080/exports/add/${id}`, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
export const importExportByInventory = async (id, item) => {
  const token = localStorage.getItem("token");
  return (
    await axios.put(`http://localhost:8080/exports/import/${id}`, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
