import axios from "axios";

const headers = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};

export const getSuppliers = async () => {
  return await axios.get(`http://localhost:8080/api/suppliers/findAll`, {
    headers,
  });
};
export const createSupplier = async (supplier) => {
  return axios.post(`http://localhost:8080/api/suppliers`, supplier, {
    headers,
  });
};
export const deleteSupplier = async (listId) => {
  return axios.put(`http://localhost:8080/api/suppliers/delete`, listId, {
    headers,
  });
};
export const updateStatusSupplier = async (listId, status) => {
  return axios.put(
    `http://localhost:8080/api/suppliers/updateStatus/${status}`,
    listId,
    { headers }
  );
};
export const updateSupplier = async (supplier) => {
  return axios.put(`http://localhost:8080/api/suppliers`, supplier, {
    headers,
  });
};
export const getSupplierById = async (id) => {
  return await axios.get(`http://localhost:8080/api/suppliers/${id}`, {
    headers,
  });
};

export const getProvince = async () => {
  return await axios.get(`https://provinces.open-api.vn/api/p`);
};

export const getDistrict = async (code) => {
  return await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
};
export const getWard = async (code) => {
  return await axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
};

export const getProductVariant = async (pageNumber, searchValue) => {
  return await axios.get(
    `http://localhost:8080/api/product-variants/findProductVariant?pageNumber=${pageNumber}&pageSize=7&searchValue=${searchValue}`,
    { headers }
  );
};
export const getCountTotalProductVariant = async (searchValue) => {
  return await axios.get(
    `http://localhost:8080/api/product-variants/count-total?searchValue=${searchValue}`,
    { headers }
  );
};
export const createImport = async (im) => {
  return await axios.post(`http://localhost:8080/api/imports/`, im, {
    headers,
  });
};
export const getImportInvoices = async (value) => {
  return await axios.get(
    `http://localhost:8080/api/imports/findAll?searchValue=${value}`,
    { headers }
  );
};
export const getDetailImportInvoice = async (code) => {
  return await axios.get(
    `http://localhost:8080/api/imports/getDetails/${code}`,
    { headers }
  );
};
export const updateStatusInvoice = async (importId, status, accountId) => {
  return await axios.put(
    `http://localhost:8080/api/imports/updateStatus?id=${importId}&status=${status}&accountId=${accountId}`,
    { title: "Update trạng thái" },
    { headers }
  );
};
export const updateStatusReturnInvoice = async (
  importId,
  status,
  accountId
) => {
  return await axios.put(
    `http://localhost:8080/api/imports/updateStatusReturn?id=${importId}&status=${status}&accountId=${accountId}`,
    { title: "Update trạng thái trả hàng" },
    { headers }
  );
};
export const getHistoryStatusImportInvoice = async (importId) => {
  return await axios.get(
    `http://localhost:8080/api/imports/getStatusHistory/${importId}`,
    { headers }
  );
};

export const getImportReturn = async (code) => {
  return await axios.get(
    `http://localhost:8080/api/imports/getReturnImport/${code}`,
    { headers }
  );
};

export const returnImportInvoice = async (obj, inventoryId) => {
  return await axios.post(
    `http://localhost:8080/api/return_import/${inventoryId}`,
    obj,
    { headers }
  );
};

export const getDetailsImportReturn = async (code) => {
  return await axios.get(
    `http://localhost:8080/api/imports/getDetailsReturnImport/${code}`,
    { headers }
  );
};

export const getCurrentQuantityInventory = async (id) => {
  return await axios.get(
    `http://localhost:8080/inventories/getCurrentQuantityInventory/${id}`,
    { headers }
  );
};

export const getImportInvoiceBySupplier = async (id) => {
  return await axios.get(
    `http://localhost:8080/api/imports/getImportInvoiceBySuppler/${id}`,
    { headers }
  );
};

export const getAllAccount = async () => {
  return await axios.get(`http://localhost:8080/api/account/findAll`, {
    headers,
  });
};

export const findAccountById = async (id) => {
  return await axios.get(`http://localhost:8080/api/account?id=${id}`, {
    headers,
  });
};
