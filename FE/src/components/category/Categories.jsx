import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Space, Table, Button } from "antd";
import "../../styles/Category.css";
import CategoryCreate from "./CategoryCreate";
import CategoryUpdate from "./CategoriesUpdate";
import { deleteListCategory, getCategories } from "../../api/apiCategory";
import { Link } from "react-router-dom";
import { DeleteOutlined, DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import ToastCustom from "../../constant/Toast";
import { DeletedIcon } from "../../common_components/ActionIcons";
import Search from "antd/lib/input/Search";
import useTitle from "../../constant/useTitle";

export default function Categories() {
  useTitle("Danh mục sản phẩm", "Danh mục");
  const [response, setResponse] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [status, setStatus] = useState(false);
  const [reload, setReload] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(
    function getAll() {
      setReload(true);
      getCategories(inputValue)
        .then((response) => {
          setResponse(response.data);
          setReload(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [status, inputValue]
  );
  const handleSearch = (e) => {
    setInputValue(e.trim());
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  let hasSelected = selectedRowKeys.length > 0;

  const data = response;

  const columns = [
    {
      title: "Mã danh mục",
      dataIndex: "id",
      render: (id) => {
        return <a>{id}</a>;
      },
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Thao tác",

      render: (row) => (
        <Space>
          <CategoryUpdate
            status={() => setStatus(!status)}
            categoryProp={row}
          />
          <DeletedIcon className="text-red-500" onClick={() => onDelete(row)} />
        </Space>
      ),
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      onDeleteList(selectedRowKeys);
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: <Link to="#">Xóa danh mục</Link>,
          key: "1",
          icon: <DeleteOutlined />,
          danger: true,
        },
      ]}
    />
  );

  const onDeleteList = async (listId) => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn không thể hồi phục lại dữ liệu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Thoát",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteListCategory(listId).then(() => {
          ToastCustom.fire({
            icon: "success",
            title: "Xoá thành công",
          }).then((r) => {});
          setStatus(!status);
          setSelectedRowKeys([]);
        });
      }
    });
  };

  const onDelete = (row) => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn không thể hồi phục lại dữ liệu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Thoát",
    }).then((result) => {
      if (result.isConfirmed) {
        const listId = [];
        listId.push(row.id);
        deleteListCategory(listId).then(() => {
          ToastCustom.fire({
            icon: "success",
            title: "Xoá thành công",
          }).then((r) => {});
          setStatus(!status);
          setSelectedRowKeys([]);
        });
      }
    });
  };

  return (
    <div className="p-5">
      {/* <h1 style={{ fontSize: "30px", marginRight: 10 }}>Danh sách danh mục </h1> */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Dropdown overlay={menu} disabled={!hasSelected}>
            <Button
              type="primary"
              style={{
                width: "180px",
                fontSize: "14px",
                marginLeft: "0px",
                height: "37px",
              }}
            >
              Thao tác
              <DownOutlined />
            </Button>
          </Dropdown>
          <span style={{ marginLeft: 8, marginRight: 8 }}>
            {hasSelected ? `Đã chọn ${selectedRowKeys.length} danh mục` : ""}
          </span>
        </div>
        <div>
          <Space>
            <Search
              style={{ width: "300px" }}
              placeholder="Tìm kiếm theo tên, mã danh mục"
              size="large"
              onSearch={(e) => handleSearch(e)}
            />
            <CategoryCreate status={() => setStatus(!status)} />
          </Space>
        </div>
      </div>
      <Table
        rowKey={"id"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={{ spinning: reload }}
        pagination = {{pageSize: 10}}
      />
    </div>
  );
}
