import axios from "axios";

const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};
export const creatDetailExport = async (item) => {
  return await axios.post(`http://localhost:8080/details/createAll`, item, {headers});
};
export const findDetailByExport = async (id) => {
  return (await axios.get(`http://localhost:8080/details/getByExport/${id}`, {headers}))
    .data;
};
export const getDetailExport = async () => {
  return (await axios.get(`http://localhost:8080/details`, {headers})).data;
};
export const deleteDetailExport = async (id) => {
  return (await axios.delete(`http://localhost:8080/details/${id}`, {headers})).data;
};
export const deleteDetailByExport = async (id) => {
  return (await axios.delete(`http://localhost:8080/details/getByExport/${id}`, {headers}))
    .data;
};
