import axios from "axios";

export const getSuppliers = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(`http://localhost:8080/api/suppliers/findAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createSupplier = async (supplier) => {
  const token = localStorage.getItem("token");
  return axios.post(`http://localhost:8080/api/suppliers`, supplier, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteSupplier = async (listId) => {
  const token = localStorage.getItem("token");
  return axios.put(`http://localhost:8080/api/suppliers/delete`, listId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateStatusSupplier = async (listId, status) => {
  const token = localStorage.getItem("token");
  return axios.put(
    `http://localhost:8080/api/suppliers/updateStatus/${status}`,
    listId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const updateSupplier = async (supplier) => {
  const token = localStorage.getItem("token");
  return axios.put(`http://localhost:8080/api/suppliers`, supplier, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getSupplierById = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.get(`http://localhost:8080/api/suppliers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProvince = async () => {
  return await axios.get(`https://esgoo.net/api-tinhthanh/1/0.htm`);
};

export const getDistrict = async (code) => {
  return await axios.get(`https://esgoo.net/api-tinhthanh/2/${code}.htm`);
};
export const getWard = async (code) => {
  return await axios.get(`https://esgoo.net/api-tinhthanh/3/${code}.htm`);
};

export const getProductVariant = async (pageNumber, searchValue) => {
  const token = localStorage.getItem("token");
  return await axios.get(
    `http://localhost:8080/api/product-variants/findProductVariant?pageNumber=${pageNumber}&pageSize=7&searchValue=${searchValue}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getCountTotalProductVariant = async (searchValue) => {
  const token = localStorage.getItem("token");
  return await axios.get(
    `http://localhost:8080/api/product-variants/count-total?searchValue=${searchValue}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const createImport = async (im) => {
  const token = localStorage.getItem("token");
  return await axios.post(`http://localhost:8080/api/imports/`, im, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getImportInvoices = async (value) => {
  const token = localStorage.getItem("token");
  return await axios.get(
    `http://localhost:8080/api/imports/findAll?searchValue=${value}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getDetailImportInvoice = async (code) => {
  const token = localStorage.getItem("token");
  return await axios.get(
    `http://localhost:8080/api/imports/getDetails/${code}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const updateStatusInvoice = async (importId, status, accountId) => {
  const token = localStorage.getItem("token");
  return await axios.put(
    `http://localhost:8080/api/imports/updateStatus?id=${importId}&status=${status}&accountId=${accountId}`,
    { title: "Update trạng thái" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const updateStatusReturnInvoice = async (
  importId,
  status,
  accountId
) => {
  const token = localStorage.getItem("token");
  return await axios.put(
    `http://localhost:8080/api/imports/updateStatusReturn?id=${importId}&status=${status}&accountId=${accountId}`,
    { title: "Update trạng thái trả hàng" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getHistoryStatusImportInvoice = async (importId) => {
  const token = localStorage.getItem("token");
  return await axios.get(
    `http://localhost:8080/api/imports/getStatusHistory/${importId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getImportReturn = async (code) => {
  const token = localStorage.getItem("token");
  return await axios.get(
    `http://localhost:8080/api/imports/getReturnImport/${code}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const returnImportInvoice = async (obj, inventoryId) => {
  const token = localStorage.getItem("token");
  return await axios.post(
    `http://localhost:8080/api/return_import/${inventoryId}`,
    obj,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getDetailsImportReturn = async (code) => {
  const token = localStorage.getItem("token");
  return await axios.get(
    `http://localhost:8080/api/imports/getDetailsReturnImport/${code}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getCurrentQuantityInventory = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.get(
    `http://localhost:8080/inventories/getCurrentQuantityInventory/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getImportInvoiceBySupplier = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.get(
    `http://localhost:8080/api/imports/getImportInvoiceBySuppler/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllAccount = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(`http://localhost:8080/api/account/findAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findAccountById = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.get(`http://localhost:8080/api/account?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
