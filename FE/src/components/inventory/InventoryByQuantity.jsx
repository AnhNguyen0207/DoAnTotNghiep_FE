import { Table, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { findInventoryByQuantity } from "../../api/inventory";

const InventoryByQuantity = (inventoryId, status) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    findInventoryByQuantity(inventoryId).then((response) => {
      setData(response.data);
    });
  }, [status]);

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: ["code", "obj"],
      render: (code, obj) => {
        return (
          <Link
            style={{ textDecoration: "underline" }}
            to={`/warehouse/products/${obj.productId}`}
          >
            {obj.code}
          </Link>
        );
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá nhập (đơn vị vnđ)",
      dataIndex: "importPrice",
      render: (Price) => (
        <NumberFormat
          value={Price}
          displayType="text"
          thousandSeparator={true}
        />
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "quantity",
      render: (quantity) => (
        <NumberFormat
          value={quantity}
          displayType="text"
          thousandSeparator={true}
        />
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Danh sách sản phẩm sắp hết
      </Button>
      <Modal
        footer={null}
        width={750}
        open={isModalOpen}
        destroyOnClose
        title="Danh sách sản phẩm sắp hết hàng"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={data || []}
          bordered
        />
      </Modal>
    </>
  );
};
export default InventoryByQuantity;
