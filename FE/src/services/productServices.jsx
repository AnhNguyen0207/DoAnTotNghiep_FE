const baseUrl = "http://localhost:8080/api/";
export var token = localStorage.getItem("token");

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

const addProduct = (data) => {
  return fetch(baseUrl + "products", getRequest(data, "post", token));
};

const getProducts = (data) => {
  return fetch(baseUrl + "products/filter", getRequest(data, "post", token));
};

const countProductByFilter = (data) => {
  return fetch(baseUrl + "products/count", getRequest(data, "POST", token));
};
const getProductById = (id) => {
  return fetch(baseUrl + "products/" + id, getRequest({}, "GET", token));
};
const deleteProductById = (id) => {
  return fetch(baseUrl + "products/" + id, getRequest({}, "Delete", token));
};
const deleteProductsById = (listId) => {
  return fetch(baseUrl + "products", getRequest(listId, "Delete", token));
};
const deleteVariantById = (id) => {
  return fetch(
    baseUrl + "products/variants/" + id,
    getRequest({}, "Delete", token)
  );
};
const deleteVariantsById = (listId) => {
  return fetch(
    baseUrl + "products/variants",
    getRequest(listId, "Delete", token)
  );
};
export const updateProduct = (productInfo) => {
  return fetch(baseUrl + "products", getRequest(productInfo, "Put", token));
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
