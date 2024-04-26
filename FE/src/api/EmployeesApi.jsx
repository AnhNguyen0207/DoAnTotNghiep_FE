import axios from "axios";

export const employeeDetailsApi = async (id) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/api/account/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const updateEmployeeApi = async (data) => {
  const token = localStorage.getItem("token");
  return axios.put("http://localhost:8080/employee", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const employeesApi = async (id) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get("http://localhost:8080/api/account", {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const rolesApi = async (page, pageSize) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/api/admin/roles/${page}`, {
      params: { pageSize },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const accountApi = async (page, pageSize) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/api/account/${page}`, {
      params: { pageSize },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const deleteEmpApi = async (id) => {
  const token = localStorage.getItem("token");
  return await (
    await axios.delete(`http://localhost:8080/api/account/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
