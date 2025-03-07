import { Table, Button, EditIcon, Lock, UnLock } from "../../common_components";
import {
  Space,
  Modal,
  Form,
  Input,
  Tag,
  // Progress,
  Tooltip,
  Col,
  Row,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import {
  createInventory,
  updateInvetory,
  deleteInvetory,
  getPagination,
  updateStatusInventory,
} from "../../api/inventory";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import FilterBox from "../../common_components/FilterBox";
import ToastCustom from "../../constant/Toast";
import useTitle from "../../constant/useTitle";

const InventoryList = () => {
  const navigate = useNavigate();
  useTitle("Danh sách kho hàng", "Kho hàng");
  const tailLayout = {
    wrapperCol: { offset: 18, span: 18 },
    labelCol: { span: 100 },
  };

  const columns = [
    // {
    //   title: <b>Id</b>,
    //   dataIndex: "inventory",
    //   key: "id",
    //   render: (inventory: IInventory) => {
    //     return <div>{inventory?.id}</div>;
    //   },
    //   sorter: (a: IInventory, b: IInventory) => (a?.id || 1) - (b?.id || 0),
    // },
    {
      title: <b>Mã kho</b>,
      dataIndex: "inventory",
      key: "code",
      sorter: (a, b) => {
        return a?.code?.localeCompare(b?.code);
      },
      render: (inventory) => <div className="text-blue">{inventory?.code}</div>,
    },
    {
      title: <b>Tên</b>,
      dataIndex: "inventory",
      key: "name",
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
      render: (inventory) => <div className="bg-red">{inventory?.name}</div>,
    },
    {
      title: <b>Địa chỉ</b>,
      dataIndex: "inventory",
      key: "address",
      render: (inventory) =>
        inventory?.address?.length > 36 ? (
          <Tooltip title={inventory?.address}>
            <div className="bg-red w-36 overflow-hidden addrres-table-render">
              {inventory?.address}
            </div>
          </Tooltip>
        ) : (
          <div className="bg-red w-36 overflow-hidden addrres-table-render">
            {inventory?.address}
          </div>
        ),
    },
    {
      title: <b>Tồn kho</b>,
      dataIndex: ["totalProductVariant", "inventory"],
      key: "stock",
      render: (_, record) => {
        const stock = record?.totalProductVariant;
        return (
          <Tooltip title={`${stock?.toLocaleString()}`}>
            {Intl.NumberFormat("en", { notation: "compact" }).format(stock)}
          </Tooltip>
        );
      },
    },
    {
      title: <b>Trạng thái</b>,
      dataIndex: "inventory",
      key: "isDelete",
      render: (inventory) => {
        return inventory?.isDelete ? (
          <Tag
            style={{ borderRadius: "15px", padding: "3px 10px" }}
            color={`rgb(246 76 114)`}
          >
            Ngừng hoạt động
          </Tag>
        ) : (
          <Tag
            style={{ borderRadius: "15px", padding: "3px 10px" }}
            color={"green" || `rgb(159 237 207)`}
          >
            Đang hoạt động
          </Tag>
        );
      },
    },
    {
      title: <b>Tình trạng</b>,
      dataIndex: "inventory",
      key: "isDelete",
      render: (inventory) => {
        return inventory?.size ? (
          <Tag
            style={{ borderRadius: "15px", padding: "3px 10px" }}
            color={`rgb(246 76 114)`}
            onClick={(e) => {
              e.stopPropagation();
              updateStatusInvetoryHandler(inventory, "còn trống");
            }}
          >
            Đã đầy
          </Tag>
        ) : (
          <Tag
            style={{ borderRadius: "15px", padding: "3px 10px" }}
            color={"green" || `rgb(159 237 207)`}
            onClick={(e) => {
              e.stopPropagation();
              updateStatusInvetoryHandler(inventory, "đã đầy");
            }}
          >
            Còn trống
          </Tag>
        );
      },
    },
    {
      dataIndex: "inventory",
      key: "action",
      render: (record) => {
        return (
          <Space size="small">
            <EditIcon
              onClick={(e) => {
                e.stopPropagation();
                setMode("edit");
                updateInventory(record);
                setIsModalVisible(true);
              }}
            >
              Sửa
            </EditIcon>
            {record?.isDelete ? (
              <Lock
                onClick={(e) => {
                  e.stopPropagation();
                  deleteInvetoryHandler(record, "mở khóa kho");
                }}
              />
            ) : (
              <UnLock
                onClick={(e) => {
                  e.stopPropagation();
                  deleteInvetoryHandler(record, "ngừng hoạt động kho");
                }}
              />
            )}
          </Space>
        );
      },
    },
  ];

  const inventoryMutation = useMutation((inventory) =>
    createInventory(inventory)
      .then(() => {
        ToastCustom.fire({
          icon: "success",
          title: "Thêm thành công",
        });
        setIsModalVisible(false);
        formInventory.resetFields();
      })
      .catch(() => {
        ToastCustom.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
        });
      })
  );

  const inventoriesUpdate = useMutation((inventory) =>
    updateInvetory(inventory.data, inventory.id)
      .then(() => {
        ToastCustom.fire({
          icon: "success",
          title: "Sửa thành công",
        });
        setIsModalVisible(false);
        formInventory.resetFields();
      })
      .catch(() => {
        ToastCustom.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
        });
      })
  );

  const [search, setSearch] = useState({
    filterName: "",
    filterValue: "",
  });
  const inventoriesDelete = useMutation((id) => deleteInvetory(id));
  const inventoriesUpdateStatus = useMutation((id) =>
    updateStatusInventory(id)
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullAddress, setFullAddress] = useState("");
  const [keyChange, setKeyChange] = useState(0);
  const [formInventory] = Form.useForm();
  const [mode, setMode] = useState("new");

  const handleOk = () => {
    const { code, name, id, address } = formInventory.getFieldsValue();
    const payload = {
      data: {
        code,
        name,
        address: address,
      },
      id: id,
    };

    if (mode === "new") {
      inventoryMutation.mutate(payload.data);
    } else {
      inventoriesUpdate.mutate(payload);
    }
  };

  const handleCancel = () => {
    setKeyChange(0);
    setIsModalVisible(false);
    formInventory.resetFields();
  };

  const updateInventory = (e) => {
    formInventory.setFieldsValue({
      code: e.code,
      name: e.name,
      address: e.address,
      size: e.size,
      id: e.id,
    });
  };

  const deleteInvetoryHandler = (record, text) => {
    Swal.fire({
      icon: "question",
      title: "Thay đổi trạng thái",
      html: `Xác nhận ${text} ${record?.code}`,
      confirmButtonText: "Xác nhận",
      confirmButtonColor: "rgb(48, 133, 214)",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((e) => {
      if (e.isConfirmed) {
        inventoriesDelete.mutate(record?.id || 0);
        Swal.fire("Thành công!", "Đã thay đổi thành công", "success");
      }
    });
    setIsModalVisible(false);
  };

  const updateStatusInvetoryHandler = (record, text) => {
    Swal.fire({
      icon: "question",
      title: "Thay đổi tình trạng",
      html: `Xác nhận kho ${record?.code} ${text}`,
      confirmButtonText: "Xác nhận",
      confirmButtonColor: "rgb(48, 133, 214)",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((e) => {
      if (e.isConfirmed) {
        inventoriesUpdateStatus.mutate(record?.id || 0);
        Swal.fire("Thành công!", "Đã thay đổi thành công", "success");
      }
    });
    setIsModalVisible(false);
  };

  return (
    <div className="p-5">
      <Row justify="space-between">
        <Col>
          <FilterBox search={setSearch} />
        </Col>
        <Col>
          <Button
            onClick={() => {
              setIsModalVisible(true);
              setMode("new");
            }}
          >
            <PlusOutlined /> Tạo mới kho
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        query={getPagination}
        rowKey={Math.random().toString()}
        search={search}
        onRow={(record) => {
          return {
            onClick: () =>
              navigate(`${record?.inventory?.id}`, { replace: true }),
          };
        }}
      />
      <Modal
        width={750}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        title={mode === "new" ? "Tạo Kho mới" : "Sửa thông tin kho"}
        footer={null}
      >
        <Form
          form={formInventory}
          onFinish={handleOk}
          {...{ labelCol: { span: 4 }, wrapperCol: { span: 19 } }}
        >
          <Form.Item name="id" style={{ display: "none" }}>
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Mã kho"
            name="code"
            rules={[
              {
                required: true,
                message: "Mã kho không được để trống",
                pattern: /[A-Za-z0-9]/,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label="Tên kho"
            name="name"
            rules={[
              {
                required: true,
                message: "Tên kho không được để trống",
                pattern: /[A-Za-z0-9]/,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Địa chỉ không được để trống",
                pattern: /[A-Za-z0-9]/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...{ wrapperCol: { offset: 4, span: 16 } }}>
            <Space>
              <Button htmlType="submit">
                {mode === "new" ? "Xác nhận" : "Xác nhận"}
              </Button>
              <Button mode="cancel" onClick={handleCancel}>
                Thoát
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryList;
