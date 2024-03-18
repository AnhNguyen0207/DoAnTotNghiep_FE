import axios from "axios";

export const getProducts = async () => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/api/product-variants/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
export const findProductById = async (id) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/api/product-variants/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
