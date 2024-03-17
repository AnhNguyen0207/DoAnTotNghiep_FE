import axios from "axios";

const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};
export const getExportStatus = async () => {
  return (await axios.get(`http://localhost:8080/api/exportsStatus`,{headers})).data;
};
export const createExportStatus = async (item) => {
  return await axios.post(`http://localhost:8080/api/exportsStatus`, item,{headers});
};
export const findExportStatusById = async (id) => {
  return (
    await axios.get(`http://localhost:8080/api/exportsStatus/getByExport/${id}`,{headers})
  ).data;
};
export const findExportStatusBygetByParentId = async (parentId) => {
  return (
    await axios.get(
      `http://localhost:8080/api/exportsStatus/getByParentId/${parentId}`,{headers}
    )
  ).data;
};
export const updateExportStatusById = async (id, item) => {
  return (
    await axios.put(`http://localhost:8080/api/exportsStatus/${id}`, item,{headers})
  ).data;
};
