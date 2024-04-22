import { useRoutes, Navigate } from "react-router-dom";
import React, { useEffect } from "react";

import Dashboard from "./components/Dashboard";
import Categories from "./components/category/Categories";
import Storage from "./common_components/Storage";
import AddProduct from "./components/product/AddProduct";
import Login from "./components/Login";
import SupplierList from "./components/supplier/SupplierList";
import SupplierDetails from "./components/supplier/SupplierDetails";
import ListProduct from "./components/product/ListProduct";
import TransportCompanies from "./components/transport_company/TransportCompanies";
import HomePage from "./components/home/HomePage";
import EmployeeDetails from "./components/employee/Details";
import Employee from "./components/employee/Employee";
import RoleManager from "./components/role_manager/RoleManager";
import CreateImport from "./components/import_invoice/CreateImport";
import InventoryList from "./components/inventory/InventoryList";
import ListImportInvoice from "./components/import_invoice/ListImportInvoice";
import DetailImportInvoice from "./components/import_invoice/DetailImportInvoice";
import ProductDetails from "./components/product/ProductDetails";
import CreateReturnImportInvoice from "./components/import_invoice/CreateReturnImportInvoice";
import { useDispatch } from "react-redux";
import { setUserStore } from "./store/userSlice";
import Statistics from "./components/statistics/Statistics";
import { Status } from "./components/stock_transfers/Status";
import Create from "./components/stock_transfers/Create";
import InventoryManager from "./components/inventory/InventoryManager";
import Edit from "./components/stock_transfers/Edit";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setUserStore({
        accountId: localStorage.getItem("account_id") || "",
        token: localStorage.getItem("token") || "",
      })
    );
  }, [dispatch]);
  const router = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Dashboard />,

      children: [
        {
          path: "/",
          element: <Navigate to="/home" />,
        },
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/stocker/inventories/:id",
          element: <InventoryManager />,
        },
        {
          path: "stocker/inventories",
          element: <InventoryList />,
        },
        {
          path: "coordinator/storage",
          children: [
            { path: "", element: <Storage /> },
            { path: "stock_transfers/:id", element: <Status /> },
            { path: "stock_transfers/create", element: <Create /> },
            { path: "stock_transfers/edit/:id", element: <Edit /> },
          ],
        },
        {
          path: "stocker/supplier",
          children: [
            { path: "", element: <SupplierList /> },
            { path: "details/:id", element: <SupplierDetails /> },
          ],
        },
        {
          path: "coordinator/purchase_orders",
          children: [
            { path: "", element: <ListImportInvoice /> },
            { path: "create", element: <CreateImport /> },
            { path: "details/:code", element: <DetailImportInvoice /> },
            { path: "return/:code", element: <CreateReturnImportInvoice /> },
          ],
        },

        {
          path: "warehouse/products",
          children: [
            {
              path: "add",
              element: <AddProduct />,
            },
            { index: true, element: <ListProduct /> },
            { path: ":id", element: <ProductDetails /> },
          ],
        },
        {
          path: "/statistics",
          element: <Statistics />,
        },
        {
          path: "warehouse/categories",
          element: <Categories />,
        },
        {
          path: "/transport-companies",
          element: <TransportCompanies />,
        },
        {
          path: "admin/employees/:id",
          element: <EmployeeDetails />,
        },
        {
          path: "/admin/employees",
          element: <Employee />,
        },
        {
          path: "/admin/roles",
          element: <RoleManager />,
        },
      ],
    },
  ]);

  return router;
};

export default App;
