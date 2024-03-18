import axios from "axios";

export const creatDetailExport = async (item) => {
  const token = localStorage.getItem("token");
  return await axios.post(`http://localhost:8080/details/createAll`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const findDetailByExport = async (id) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/details/getByExport/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
export const getDetailExport = async () => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
export const deleteDetailExport = async (id) => {
  const token = localStorage.getItem("token");
  return (
    await axios.delete(`http://localhost:8080/details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
export const deleteDetailByExport = async (id) => {
  const token = localStorage.getItem("token");
  return (
    await axios.delete(`http://localhost:8080/details/getByExport/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
