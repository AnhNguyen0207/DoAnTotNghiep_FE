import axios from "axios";

const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};

export const getCategoriesByPage = async (page, limit) => {
  return (
    await axios.get(`http://localhost:8080/categories`, {
      params: {
        page,
        limit,
        sortBy: "id",
        sortDir: "desc",
      },
      headers,
    })
  ).data;
};

export const getCategories = async (valueInput = "") => {
  return await axios.get(`http://localhost:8080/api/categories/findall`, {
    params: {
      valueInput: valueInput,
    },
    headers,
  });
};

export const createCategory = async (category) => {
  return axios.post(`http://localhost:8080/api/categories/category`, category, {
    headers,
  });
};

export const deleteListCategory = async (listId) => {
  return axios.post("http://localhost:8080/api/categories/delete", listId, {
    headers,
  });
};

export const updateCategory = async (category, idUpdate) => {
  return axios.put(
    `http://localhost:8080/api/categories/category/${idUpdate}`,
    category,
    { headers }
  );
};

export const deleteCategory = async (id) => {
  return axios.delete(`http://localhost:8080/api/categories/delete/${id}`, {
    headers,
  });
};
