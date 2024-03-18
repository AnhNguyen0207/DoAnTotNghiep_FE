import axios from "axios";

export const getCategoriesByPage = async (page, limit) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/categories`, {
      params: {
        page,
        limit,
        sortBy: "id",
        sortDir: "desc",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const getCategories = async (valueInput = "") => {
  const token = localStorage.getItem("token");
  return await axios.get(`http://localhost:8080/api/categories/findall`, {
    params: {
      valueInput: valueInput,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCategory = async (category) => {
  const token = localStorage.getItem("token");
  return axios.post(`http://localhost:8080/api/categories/category`, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteListCategory = async (listId) => {
  const token = localStorage.getItem("token");
  return axios.post("http://localhost:8080/api/categories/delete", listId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCategory = async (category, idUpdate) => {
  const token = localStorage.getItem("token");
  return axios.put(
    `http://localhost:8080/api/categories/category/${idUpdate}`,
    category,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`http://localhost:8080/api/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
