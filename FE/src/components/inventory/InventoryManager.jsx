import {
  Col,
  Row,
  Table,
  Button,
  Dropdown,
  Menu,
  Image,
  Input,
  Space,
  Tooltip,
  Modal,
  Form,
  message,
  Tag,
} from "antd";
import { DeleteOutlined, DownOutlined, LeftOutlined } from "@ant-design/icons";
import {
  deleteListProductVariant,
  getProductVariants,
  updateMinQuantityStorage,
} from "../../api/inventory";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import NumberFormat from "react-number-format";
import Moment from "react-moment";
import { DeletedIcon } from "../../common_components";
import Swal from "sweetalert2";
import ToastCustom from "../../constant/Toast";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useMutation } from "@tanstack/react-query";
import Buttonn from "../../common_components/Button";
import AddIcon from "@mui/icons-material/Add";
import useTitle from "../../constant/useTitle";
import InventoryByQuantity from "./InventoryByQuantity";

const InventoryManager = () => {
  useTitle("Quản lý kho", "Quản lý kho");
  const { Search } = Input;
  const { id } = useParams();
  const [inventory, setInventory] = useState({});
  const [productvariant, setProductVariant] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalproduct, settotalProduct] = useState();
  const [countproduct, setCountProduct] = useState();
  const [status, setStatus] = useState(false);
  const [reload, setReload] = useState(false);
  const [minQuantityModal, setMinQuantityModal] = useState(false);
  const [name, setName] = useState("");
  const [minQuantityForm] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setReload(true);
    getProductVariants(parseInt(id), name).then((response) => {
      setProductVariant(response.productVariants);
      setInventory(response.inventory);
      settotalProduct(response.totalProductVariant);
      setCountProduct(response.countProductVariant);
      setReload(false);
    });
  }, [status, name]);

  const minQuantityMutation = useMutation(updateMinQuantityStorage, {
    onSuccess: () => {
      ToastCustom.fire({
        icon: "success",
        title: "Thay đổi thành công",
      });
      setMinQuantityModal(false);
      setStatus(!status);
    },
    onError: () => {
      ToastCustom.fire({
        icon: "error",
        title: "Có lỗi xảy ra, vui lòng thử lại",
      });
      setMinQuantityModal(true);
    },
  });

  const minQuantityHandler = () => {
    const { minQuantity, product, storage } = minQuantityForm.getFieldsValue();
    minQuantityMutation.mutate({
      inventoryId: storage * 1,
      minQuantity: minQuantity * 1,
      productVariantId: product * 1,
    });
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (img) => {
        return (
          <Image width={45} src={img} onClick={(e) => e.stopPropagation()} />
        );
      },
    },
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
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      sorter: (a, b) => a.importPrice - b.importPrice,
    },
    {
      title: "Tồn kho",
      dataIndex: ["quantity", "min"],
      render: (_, quantity) => {
        return (
          <Row className="w-20" justify="space-between">
            <Col span={20}>
              <Tooltip
                title={
                  <NumberFormat
                    value={quantity.quantity}
                    displayType="text"
                    thousandSeparator={true}
                  />
                }
              >
                {Intl.NumberFormat("en", { notation: "compact" }).format(
                  quantity.quantity
                )}
              </Tooltip>
            </Col>
            <Col span={3}>
              <Tooltip
                title={
                  quantity.minQuantity === 0
                    ? "Thêm giới hạn cảnh báo"
                    : quantity.quantity > quantity.minQuantity
                    ? `Còn hàng ${
                        quantity?.quantity?.toLocaleString() || "Chưa xét SL"
                      } / ${
                        quantity?.minQuantity?.toLocaleString() || "Chưa xét SL"
                      }`
                    : `Sắp hết hàng ${
                        quantity?.quantity?.toLocaleString() || "Chưa xét SL"
                      } / ${
                        quantity?.minQuantity?.toLocaleString() || "Chưa xét SL"
                      }`
                }
              >
                {quantity?.minQuantity ? (
                  <FiberManualRecordIcon
                    onClick={() => {
                      setMinQuantityModal(true);
                      minQuantityForm.setFieldValue("storage", id);
                      minQuantityForm.setFieldValue("product", quantity?.id);
                    }}
                    style={
                      quantity.quantity > quantity.minQuantity
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  />
                ) : (
                  <AddIcon
                    onClick={() => {
                      setMinQuantityModal(true);
                      minQuantityForm.setFieldValue("storage", id);
                      minQuantityForm.setFieldValue("product", quantity?.id);
                    }}
                  />
                )}
              </Tooltip>
            </Col>
          </Row>
        );
      },
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Ngày khởi tạo",
      dataIndex: "createAt",
      render: (createAt) => (
        <Moment format="DD/MM/YYYY HH:mm:ss">{createAt}</Moment>
      ),
      sorter: (a, b) => a.createAt.localeCompare(b.createAt),
    },
    // {
    //   render: (row) => (
    //     <DeletedIcon
    //       className="text-red-500"
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         onDelete(row);
    //       }}
    //     />
    //   ),
    // },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  let hasSelected = selectedRowKeys.length > 0;

  const data = productvariant;

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
        const idResult = {
          idInventory: inventory.id,
          idProductVariant: listId,
        };
        deleteListProductVariant(idResult).then(() => {
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
        const idResult = {
          idInventory: inventory.id,
          idProductVariant: listId,
        };
        deleteListProductVariant(idResult).then(() => {
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
          label: <Link to="#">Xóa các phiên bản sản phẩm</Link>,
          key: "1",
          icon: <DeleteOutlined />,
          danger: true,
        },
      ]}
    />
  );
  const handleSearch = (e) => {
    setName(e.trim());
  };

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
        <h2 style={{ fontSize: "15px" }}>
          <Link to="/stocker/inventories">
            <LeftOutlined /> Danh sách kho
          </Link>
        </h2>
        <div>
          <Space>
            {inventory?.id ? (
              <InventoryByQuantity inventoryId={inventory?.id} />
            ) : null}
            <Button
              type="primary"
              onClick={() => navigate(`../warehouse/categories`)}
            >
              Xem danh mục sản phẩm
            </Button>
            <Button
              type="primary"
              onClick={() => navigate(`../warehouse/products`)}
            >
              Xem danh sách sản phẩm
            </Button>
          </Space>
        </div>
      </div>

      <Row gutter={24}>
        <Col span={18}>
          <div className="block">
            <h1 style={{ color: "#1890FF" }}>Tất cả phiên bản sản phẩm</h1>
            <Search
              placeholder="Tìm kiếm theo tên, mã sản phẩm"
              size="large"
              onSearch={(e) => handleSearch(e)}
            />
            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            > */}
            {/* <Dropdown overlay={menu} disabled={!hasSelected}>
                <Button
                  type="primary"
                  style={{
                    width: "180px",
                    fontSize: "14px",
                    marginLeft: "0px",
                  }}
                >
                  Thao tác
                  <DownOutlined />
                </Button>
              </Dropdown> */}
            {/* <span style={{ marginLeft: 8, marginRight: 8 }}>
                {hasSelected
                  ? `Đã chọn ${selectedRowKeys.length} phiên bản sản phẩm`
                  : ""}
              </span>
            </div> */}
            <Table
              rowKey={"id"}
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              bordered
              loading={{ spinning: reload }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="block">
            <h1 style={{ color: "#1890FF" }}>Thông tin kho</h1>
            <form>
              <Row gutter={24}>
                <Col span={8}>
                  <p>Trạng thái:</p>
                </Col>
                <Col span={16}>
                  {inventory?.isDelete ? (
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
                  )}
                </Col>

                <Col span={8}>
                  <p>Mã kho:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>{inventory.code}</b>
                </Col>

                <Col span={8}>
                  <p>Tên kho:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>{inventory.name}</b>
                </Col>

                <Col span={8}>
                  <p>Số lượng phiên bản sản phẩm:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>
                    <NumberFormat
                      value={countproduct}
                      displayType="text"
                      thousandSeparator={true}
                    />
                  </b>
                </Col>

                <Col span={8}>
                  <p>Tổng sản phẩm:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>
                    <NumberFormat
                      value={totalproduct}
                      displayType="text"
                      thousandSeparator={true}
                    />
                  </b>
                </Col>

                {/* <Col span={8}>
                    <p>Size:</p>
                  </Col>
                  <Col span={16}>
                    <b style={{ textTransform: "uppercase" }}>
                      <NumberFormat value={inventory.size} displayType='text' thousandSeparator={true} />
                    </b>
                  </Col> */}

                <Col span={8}>
                  <p>Địa chỉ:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>
                    {inventory.address}
                  </b>
                </Col>

                <Col span={8}>
                  <p>Thời gian tạo:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                      {inventory.createAt}
                    </Moment>
                  </b>
                </Col>

                <Col span={8}>
                  <p>Thời gian sửa:</p>
                </Col>
                <Col span={16}>
                  <b style={{ textTransform: "uppercase" }}>
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                      {inventory.updateAt}
                    </Moment>
                  </b>
                </Col>
              </Row>
            </form>
          </div>
        </Col>
      </Row>
      <Modal
        open={minQuantityModal}
        destroyOnClose
        onCancel={() => setMinQuantityModal(false)}
        closeIcon={null}
        footer={null}
      >
        <Form form={minQuantityForm}>
          <Form.Item name="storage" style={{ display: "none" }}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="product" style={{ display: "none" }}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="minQuantity"
            label="Giới hạn cảnh báo hết hàng"
            className="w-max"
          >
            <Input type="number" min={0} width={20} />
          </Form.Item>
          <Form.Item>
            <Buttonn
              loading={minQuantityMutation.isLoading}
              onClick={minQuantityHandler}
              type="submit"
            >
              Ok
            </Buttonn>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryManager;
