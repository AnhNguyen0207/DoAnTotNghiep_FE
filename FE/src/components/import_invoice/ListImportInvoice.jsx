/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { getImportInvoices } from "../../api/api";
import { Button, Spin, Table } from "antd";
import { ImportInvoiceColumn } from "../../common_components/Datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { Input } from "antd";
import "../../styles/Tab.css";
import { debounce } from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import useTitle from "../../constant/useTitle";

const ListImportInvoice = () => {
  useTitle("Đơn nhập hàng", "Đơn nhập hàng");
  const navigate = useNavigate();
  const [importInvoices, setImportInvoices] = useState([]);
  const [importInvoicesIsDone, setImportInvoicesIsDone] = useState([]);
  const [importInvoicesIsReturn, setImportInvoicesIsReturn] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [spin, setSpin] = useState(true);

  const debounceDropDown = useCallback(
    debounce((nextValue) => loadData(nextValue), 700),
    []
  );

  function handleInputOnchange(e) {
    setIsLoading(false);
    const { value } = e.target;
    setKeyword(value);
    debounceDropDown(value);
  }

  const loadData = (value) => {
    getImportInvoices(value).then((r) => {
      setImportInvoicesIsDone(r.data.filter((result) => !result.isDone));
      setImportInvoicesIsReturn(r.data.filter((result) => result.isReturn));
      setImportInvoices(r.data);
      setIsLoading(true);

      setSpin(false);
    });
  };

  useEffect(() => {
    loadData(keyword);
  }, []);

  const OperationsSlot = (
    <Input
      onChange={(e) => handleInputOnchange(e)}
      style={{ padding: "8px", marginTop: 10 }}
      className="tabs-extra-demo-button"
      placeholder="Tìm kiếm theo mã đơn hàng, mã nhà cung cấp, tên kho"
    />
  );

  const items = [
    {
      key: "1",
      label: "Tất cả cả đơn hàng",
      children: (
        <>
          <Table
            dataSource={importInvoices}
            columns={ImportInvoiceColumn.filter(
              (col) => col.dataIndex !== "isReturn"
            )}
            rowKey={"code"}
            pagination={{ defaultPageSize: 10 }}
            onRow={(record) => {
              return {
                onClick: (event) =>
                  navigate({ pathname: `details/${record.code}` }),
              };
            }}
            loading={!isLoading}
            // rowSelection={rowSelection}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "Đang giao dịch",
      children: (
        <>
          <Table
            dataSource={importInvoicesIsDone}
            columns={ImportInvoiceColumn.filter(
              (col) => col.dataIndex !== "isReturn"
            )}
            rowKey={"code"}
            pagination={{ defaultPageSize: 10 }}
            onRow={(record) => {
              return {
                onClick: (event) =>
                  navigate({
                    pathname: `/coordinator/purchase_orders/details/${record.code}`,
                  }),
              };
            }}
            loading={!isLoading}
            // rowSelection={rowSelection}
          />
        </>
      ),
    },
    {
      key: "3",
      label: "Trả hàng",
      children: (
        <>
          <Table
            dataSource={importInvoicesIsReturn}
            columns={ImportInvoiceColumn.filter(
              (col) => col.dataIndex !== "isReturn"
            )}
            rowKey={"code"}
            pagination={{ defaultPageSize: 10 }}
            onRow={(record) => {
              return {
                onClick: (event) =>
                  navigate({
                    pathname: `/coordinator/purchase_orders/details/${record.code}`,
                  }),
              };
            }}
            loading={!isLoading}
            // rowSelection={rowSelection}
          />
        </>
      ),
    },
  ];

  return (
    <Spin spinning={spin}>
      <div className="p-5">
        <div
          style={{
            display: "flex",
            paddingBottom: "20px",
          }}
        >
          <Link to="/coordinator/purchase_orders/create">
            <Button type="primary">
              <PlusOutlined /> Tạo đơn nhập hàng
            </Button>
          </Link>
        </div>

        <Tabs
          style={{ display: "block" }}
          tabBarExtraContent={OperationsSlot}
          defaultActiveKey="1"
          items={items}
          tabPosition={{ position: "bottom" }}
        />
      </div>
    </Spin>
  );
};
export default ListImportInvoice;
