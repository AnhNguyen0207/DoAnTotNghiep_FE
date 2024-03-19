import axios from "axios";
const baseUrl = "http://localhost:8080/api";

const getRequest = (body, method, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (token) myHeaders.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: method,
    headers: myHeaders,
    body: raw,
  };
  if (method.toUpperCase() === "GET") {
    const { body, ...request } = { ...requestOptions };
    return request;
  }

  return requestOptions;
};

const addProduct = async (data) => {
  const token = localStorage.getItem("token");
  // return fetch(baseUrl + "products", getRequest(data, "post", token));
  return await axios.post(`${baseUrl}/products`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getProducts = async (data) => {
  const token = localStorage.getItem("token");
  // return fetch(baseUrl + "products/filter", getRequest(data, "post", token));
  return await axios.post(`${baseUrl}/products/filter`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const countProductByFilter = async (data) => {
  const token = localStorage.getItem("token");
  // return fetch(baseUrl + "products/count", getRequest(data, "POST", token));
  return await axios.post(`${baseUrl}/products/count`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getProductById = async (id) => {
  const token = localStorage.getItem("token");
  // return fetch(baseUrl + "products/" + id, getRequest({}, "GET", token));
  return await axios.get(`${baseUrl}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteProductById = async (id) => {
  const token = localStorage.getItem("token");
  // return fetch(baseUrl + "products/" + id, getRequest({}, "Delete", token));
  return await axios.delete(`${baseUrl}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteProductsById = async (listId) => {
  const token = localStorage.getItem("token");
  // return fetch(baseUrl + "products", getRequest(listId, "Delete", token));
  return await axios.delete(`${baseUrl}/products`, {
    data: listId,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteVariantsById = async (listId) => {
  const token = localStorage.getItem("token");
  // return fetch(baseUrl + "products/variants",getRequest(listId, "Delete", token));
  return await axios.delete(`${baseUrl}/products/variants`, {
    data: listId,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (productInfo) => {
  const token = localStorage.getItem("token");
  // return fetch(baseUrl + "products", getRequest(productInfo, "Put", token));
  return await axios.put(`${baseUrl}/products`, productInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  addProduct,
  getProducts,
  countProductByFilter,
  getProductById,
  deleteProductById,
  deleteVariantsById,
  deleteProductsById,
  getRequest,
  baseUrl,
};
