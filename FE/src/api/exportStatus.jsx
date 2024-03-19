import axios from "axios";

export const getExportStatus = async () => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/api/exportsStatus`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
export const createExportStatus = async (item) => {
  const token = localStorage.getItem("token");
  return await axios.post(`http://localhost:8080/api/exportsStatus`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const findExportStatusById = async (id) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(
      `http://localhost:8080/api/exportsStatus/getByExport/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).data;
};
export const findExportStatusBygetByParentId = async (parentId) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(
      `http://localhost:8080/api/exportsStatus/getByParentId/${parentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).data;
};
export const updateExportStatusById = async (id, item) => {
  const token = localStorage.getItem("token");
  return (
    await axios.put(`http://localhost:8080/api/exportsStatus/${id}`, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
