import axios from "axios";
const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};

export const employeeDetailsApi = async (id) => {
  return (
    await axios.get(`http://localhost:8080/api/account/${id}`, {
      headers,
    })
  ).data;
};

export const updateEmployeeApi = async (data) => {
  return axios.post("http://localhost:8080/api/roles/emp", data, {
    headers,
  });
};

export const employeesApi = async (id) => {
  return (
    await axios.get("http://localhost:8080/api/account", {
        params: {
            id
        },
      headers,
    })
  ).data;
};

export const rolesApi = async (page, pageSize) => {
  return (
    await axios.get(`http://localhost:8080/api/admin/roles/${page}`, {
      params: { pageSize },
      headers,
    })
  ).data;
};

export const accountApi = async (page, pageSize) => {
  return (
    await axios.get(`http://localhost:8080/api/account/${page}`, {
      params: { pageSize },
      headers,
    })
  ).data;
};

export const deleteEmpApi = async (id) => {
  return await (
    await axios.delete(`http://localhost:8080/api/account/${id}`, {
      headers,
    })
  ).data;
};
