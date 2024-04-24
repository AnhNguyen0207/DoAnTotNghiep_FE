import { Button, Dropdown, Menu, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  deleteSupplier,
  getSuppliers,
  updateStatusSupplier,
} from "../../api/api";
import { SupplierColumn } from "../../common_components/Datatablesource";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Table.css";
import {
  DeleteOutlined,
  DownOutlined,
  InfoCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import ToastCustom from "../../constant/Toast";
import Swal from "sweetalert2";
import SupplierCreate from "./SupplierCreate";
import ImportExcel from "../../common_components/ImportExcel";
import ExportExcel from "../../common_components/ExportExcel";
import useTitle from "../../constant/useTitle";

const SupplierList = () => {
  const [data, setData] = useState([{}]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useTitle("Nhà cung cấp", "Nhà cung cấp");

  useEffect(() => {
    // setTimeout(() => {
    getSuppliers().then((r) => {
      setData(r.data.reverse());
      setIsLoading(false);
    });
    // }, 1000)
  }, [reload]);

  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  let hasSelected = selectedRowKeys.length > 0;

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        onUpdateFalseStatus(selectedRowKeys);
        break;
      case "2":
        onUpdateTrueStatus(selectedRowKeys);
        break;
      case "3":
        onDelete(selectedRowKeys);
        break;
      default:
        break;
    }
  };

  const onDelete = (listId) => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn không thể hồi phục lại dữ liệu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSupplier(listId).then(() => {
          ToastCustom.fire({
            icon: "success",
            title: "Xoá thành công",
          }).then((r) => {});
          setReload(!reload);
          setIsLoading(true);
          setSelectedRowKeys([]);
        });
      }
    });
  };

  const onUpdateTrueStatus = (listId) => {
    updateStatusSupplier(listId, "true").then(() => {
      ToastCustom.fire({
        icon: "success",
        title: "Sửa trạng thái thành công",
      }).then((r) => {});
      setIsLoading(true);
      setReload(!reload);
      setSelectedRowKeys([]);
    });
  };
  const onUpdateFalseStatus = (listId) => {
    updateStatusSupplier(listId, "false").then(() => {
      ToastCustom.fire({
        icon: "success",
        title: "Sửa trạng thái thành công",
      }).then((r) => {});
      setIsLoading(true);
      setReload(!reload);
      setSelectedRowKeys([]);
    });
  };

  // const [visible, setVisible] = useState(false);
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: <Link to="#">Ngừng giao dịch</Link>,
          key: "1",
          icon: <StopOutlined />,
        },
        {
          label: <Link to="#">Cập nhập trạng thái</Link>,
          key: "2",
          icon: <InfoCircleOutlined />,
        },
        {
          label: <Link to="#">Xóa nhà cung cấp</Link>,
          key: "3",

          icon: <DeleteOutlined />,
        },
      ]}
    />
  );

  return (
    <div className="p-5">
      <div
        style={{
          paddingBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Dropdown overlay={menu} disabled={!hasSelected}>
            <Button style={{ width: "180px", fontSize: "14px" }} type="primary">
              <Space>
                Thao tác
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <span
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} istems` : ""}
          </span>
          <ImportExcel reload={() => setReload(!reload)} />
          <ExportExcel />
        </div>
        <div>
          <SupplierCreate reload={() => setReload(!reload)} />
        </div>
      </div>

      <Table
        dataSource={data}
        columns={SupplierColumn}
        rowKey={"id"}
        bordered
        pagination={{ defaultPageSize: 5 }}
        onRow={(record) => {
          return {
            onClick: (event) =>
              navigate({
                pathname: `/stocker/supplier/details/${record.id}`,
              }),
          };
        }}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default SupplierList;
