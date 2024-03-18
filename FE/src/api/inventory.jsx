import axios from "axios";

export const getAllInventory = async () => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/inventories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const getAllActiveInventory = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(`http://localhost:8080/inventories/active`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPagination = async (page, pageSize, name, value) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/inventories/pagination`, {
      params: {
        pageNumber: page,
        pageSize,
        sortBy: "id",
        sortDir: "desc",
        name: name === "name" ? value : null,
        code: name === "code" ? value : null,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
export const findInventoryById = async (id) => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/inventories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const createInventory = async (inventory) => {
  const token = localStorage.getItem("token");
  return (
    await axios.post(`http://localhost:8080/inventories`, inventory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const updateInvetory = async (inventory, id) => {
  const token = localStorage.getItem("token");
  return (
    await axios.put(`http://localhost:8080/inventories/${id}`, inventory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const deleteInvetory = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.put(
    `http://localhost:8080/inventories/delete/${id}`,
    { title: "Sửa trạng thái" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateStatusInventory = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.put(
    `http://localhost:8080/inventories/status/${id}`,
    { title: "Sửa tình trạng" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getProductVariants = async (id, name = "") => {
  const token = localStorage.getItem("token");
  return (
    await axios.get(`http://localhost:8080/inventories/productvariant/${id}`, {
      params: {
        name: name,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const deleteListProductVariant = async (resultId) => {
  const token = localStorage.getItem("token");
  return await axios.post(
    `http://localhost:8080/inventories/delete`,
    resultId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const findInventoryByQuantity = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.get(`http://localhost:8080/inventories/quantity`, {
    params: {
      id: id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateMinQuantityStorage = async (request) => {
  const token = localStorage.getItem("token");
  return await axios.put(
    `http://localhost:8080/inventories/change/minquantity?inventoryId=${
      request.inventoryId * 1
    }&productVariantId=${request.productVariantId * 1}&minQuantity=${
      request.minQuantity * 1
    }`,
    { title: "Sửa minquantity" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
