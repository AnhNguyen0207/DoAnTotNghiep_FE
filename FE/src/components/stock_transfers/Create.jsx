/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import {
  Select,
  Popconfirm,
  Input,
  message,
  Spin,
  Empty,
  Modal,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { findProductById } from "../../api/productVariant";
import "../../styles/file.css";
import {
  findInventoryById,
  getAllActiveInventory,
  getProductVariants,
} from "../../api/inventory";
import { Table } from "antd";
import { useMutation } from "@tanstack/react-query";
import { createExport } from "../../api/export";
import { creatDetailExport } from "../../api/detailExport";
import { Button } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { createExportStatus } from "../../api/exportStatus";
import useTitle from "../../constant/useTitle";
import { useSelector } from "react-redux";

const Create = () => {
  useTitle("Tạo phiếu chuyển hàng", "Tạo phiếu chuyển hàng");
  const [products, setProducts] = useState([]);
  const [inventorySend, setInventorySend] = useState();
  const [inventoryReceive, setInventoryReceive] = useState();
  const [exportId, setExportId] = useState();
  const [loading, setLoading] = useState(false);
  const [productVariant, setProductVariant] = useState();
  const [code, setCode] = useState();
  const [note, setNote] = useState();
  const navigate = useNavigate();
  const exportValue = {
    exportInventory: inventorySend,
    receiveInventory: inventoryReceive,
  };
  const user = useSelector((state) => state.user);

  const [total, setTotal] = useState(0);
  const [quantityProducts, setQuantityProducts] = useState(0);
  useEffect(() => {
    let b = 0;
    products.map((e) => {
      b += e.quantity * 1;
    });
    setTotal(b);
    setQuantityProducts(products.length);
  }, [products]);
  const handleDelete = (e) => {
    const newData = products.filter(
      (item) => item.getProductById.id * 1 !== e * 1
    );
    setProducts(newData);
  };
  const handleQuantity = (e) => {
    const quantity = e.target.value;
    const id = e.target.id * 1;
    const check = productVariant.find((a) => a.id === id);
    if (quantity * 1 <= 0) {
      message.warning("Số lượng sản phẩm không hợp lệ");
      const newData = products.filter(
        (item) => item.getProductById.id * 1 !== id
      );
      setProducts(newData);
    }
    if (quantity > check.quantity) {
      message.warning("Số lượng sản phẩm có trong kho không đủ");
    } else {
      setProducts((prev) => {
        prev.map((prod) => {
          if (prod.getProductById.id === id) {
            prod.quantity = quantity * 1;
          }
        });
        return [...prev];
      });
    }
  };

  const columns = [
    {
      title: "Mã hàng",
      dataIndex: "getProductById",
      render: (text) => {
        return <div>{text?.code}</div>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "getProductById",
      render: (text) => {
        return <div>{text?.name}</div>;
      },
    },
    {
      title: "Số lượng chuyển",
      dataIndex: ["quantity", "getProductById"],
      render: (a, text) => {
        return (
          <Input
            type={"number"}
            style={{ width: "50%" }}
            onChange={handleQuantity}
            id={text?.getProductById.id}
            key={text?.getProductById.id}
            value={text.quantity}
            min={0}
            size={"middle"}
          />
        );
      },
    },
    {
      dataIndex: ["getProductById"],
      render: (text) => {
        return (
          <Popconfirm
            id={text?.id}
            key={text?.id}
            title="Chắc chắn xoá ?"
            onConfirm={() => handleDelete(text?.id)}
            okText={"Ok"}
            cancelText={"No"}
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      },
    },
  ];

  const handleClickOptionProduct = (e) => {
    if (e === null) {
      return;
    }
    const id = e[1] * 1;
    const isFound = products.findIndex(
      (element) => element.getProductById.id === id
    );
    const hanldeClick = async () => {
      const getProductById = productVariant.find((a) => a.id === id);
      if (getProductById.quantity === 0) {
        message.warning("Sản phẩm đã hết hàng");
      } else {
        setProducts([
          {
            getProductById: getProductById,
            quantity: 1,
          },
          ...products,
        ]);
      }
    };
    if (isFound < 0) {
      hanldeClick();
    } else {
      message.warning(
        <div style={{ color: "red" }}>Sản phẩm đã được chọn</div>
      );
      // setProducts((prev) => {
      //   prev.map((prod) => {
      //     if (prod.getProductById.id === id) {
      //       prod.quantity = prod.quantity * 1 + 1;
      //     }
      //   });
      //   return [...prev];
      // });
    }
  };

  const [listInventory, setListInventory] = useState();
  const allQueries = async () => {
    const getListInventory = (await getAllActiveInventory()).data;
    setListInventory(getListInventory);
  };

  useEffect(() => {
    allQueries();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    if (
      exportValue.receiveInventory !== undefined &&
      exportValue.receiveInventory !== null &&
      exportValue.exportInventory !== undefined &&
      exportValue.exportInventory !== null &&
      products.length > 0
    ) {
      const saveExport = await createExport(exportValue);
      const exportId = saveExport.data.id;
      setExportId(exportId);
      const detailExport = products.map((e) => {
        return {
          productVariant: e.getProductById,
          quantity: e.quantity,
          export: exportId,
          code: "TPN000" + exportId,
        };
      });
      creatDetailExportSubmit.mutate(detailExport);
    } else {
      if (
        exportValue.receiveInventory === undefined ||
        exportValue.receiveInventory === null
      ) {
        message.error(
          <div style={{ color: "red" }}>Chi nhánh nhận chưa được chọn</div>
        );
      } else if (
        exportValue.exportInventory === undefined ||
        exportValue.exportInventory === null
      ) {
        message.error(
          <div style={{ color: "red" }}>Chi nhánh chuyển chưa được chọn</div>
        );
      } else if (products.length === 0) {
        message.error(
          <div style={{ color: "red" }}>
            Vui lòng chọn sản phẩm vào phiếu chuyển hàng
          </div>
        );
      }

      setLoading(false);
    }
  };

  const creatDetailExportSubmit = useMutation((item) =>
    creatDetailExport(item)
  );
  const handleNote = (e) => {
    setNote(e.target.value);
  };
  const handleStatus = async (id) => {
    if (code !== undefined) {
      await createExportStatus({
        export: id,
        status: 0,
        code: code,
        note: note,
        accountCreate: user.id,
      });
    } else {
      await createExportStatus({
        export: id,
        status: 0,
        code: "TPN000" + id,
        note: note,
        accountCreate: user.id,
      });
    }
    message.success(<div>Thêm mới thành công</div>, 2);
    navigate(`/coordinator/storage/stock_transfers/${id}`, { replace: true });
  };
  if (creatDetailExportSubmit.isSuccess) {
    handleStatus(exportId);
  }

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
  });
  const [spin, setSpin] = useState(true);
  useEffect(() => {
    setSpin(false);
  }, []);

  const [inSend, setInSend] = useState(listInventory);
  const [inReceive, setInReceive] = useState(listInventory);
  const [a, setA] = useState(1);
  useEffect(() => {
    if (listInventory === undefined) {
      setA(a + 1);
    }
    setInSend(listInventory);
    setInReceive(listInventory);
  }, [a]);
  const [send, setSend] = useState(null);
  const [receive, setReceive] = useState(null);
  const handleClear = () => {
    setSend(null);
    setReceive(null);
    setInSend(listInventory);
    setInReceive(listInventory);
    setProductVariant(null);
    setInventoryReceive(null);
    setInventorySend(null);
    setProducts([])
  };
  const handleClickOptionSend = async (e) => {
    setSend(e);
    const productVariant = await getProductVariants(e);
    setProductVariant(productVariant.productVariants);
    const exportByInventory = await findInventoryById(e);
    setInventorySend(exportByInventory);
    setInReceive(listInventory.filter((i) => i.id !== e));
  };
  const handleClickOptionReceive = async (e) => {
    setReceive(e);
    const exportReceive = await findInventoryById(e);
    setInventoryReceive(exportReceive);
    setInSend(listInventory.filter((i) => i.id !== e));
  };

  const [modal2Visible, setModal2Visible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns_modal = [
    {
      title: "Mã hàng",
      dataIndex: "code",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      align: "center",
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record, selected, selectedRows) => {
      if (selected) {
        const isFound = products.findIndex(
          (element) => element.getProductById.id * 1 === record.id
        );
        const hanldeClick = async () => {
          const getProductById = await findProductById(record.id);
          setProducts([
            {
              getProductById: getProductById,
              quantity: 1,
            },
            ...products,
          ]);
        };
        if (isFound < 0) {
          hanldeClick();
        } else {
          setProducts((prev) => {
            prev.map((prod) => {
              if (prod.getProductById.id === record.id) {
                prod.quantity = prod.quantity * 1 + 1;
              }
            });
            return [...prev];
          });
        }
      } else {
        const newData = products.filter(
          (item) => item.getProductById.id * 1 !== record.id
        );
        setProducts(newData);
      }
    },

    onSelectAll(selected, selectedRows, changeRows) {
      setProducts(
        selectedRows.map((e) => ({
          getProductById: e,
          quantity: 1,
        }))
      );
    },

    getCheckboxProps: (record) => {
      return {
        disabled: record.quantity === 0,
      };
    },
  };

  return (
    <Spin spinning={spin}>
      <div className="p-5">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "20px",
          }}
        >
          <h2 style={{ fontSize: "15px" }}>
            <Link to="/coordinator/storage">
              <LeftOutlined /> Danh sách phiếu chuyển
            </Link>
          </h2>
          <div>
            <Button
              key="2"
              onClick={() => window.history.back()}
              className="rounded-md"
            >
              Thoát
            </Button>

            <Button
              key="1"
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              className="rounded-md"
            >
              Lưu
            </Button>
          </div>
        </div>
        <div className="content">
          <div className="content-top">
            <div className="select-inventory">
              <div className="title">
                <h3>Thông tin phiếu</h3>
              </div>
              <div className="select-inventory-left">
                <div className="select-inventory-top">
                  <div className="title-p">
                    <p>Chi nhánh chuyển </p>
                    <span style={{ color: "red" }}>*</span>
                  </div>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    dropdownStyle={{ height: 150, width: 1000000 }}
                    onSelect={handleClickOptionSend}
                    placeholder="Tìm kiếm chi nhánh"
                    allowClear
                    value={send}
                  >
                    {inSend &&
                      inSend?.map((item) => (
                        <Select.Option
                          style={{ width: "100%" }}
                          key={item.id}
                          value={item.id}
                        >
                          {item.size ? (
                            <div>
                              {item.name}
                              <Tag style={{ marginLeft: 10 }} color="red">
                                Đã đầy{" "}
                              </Tag>
                            </div>
                          ) : (
                            <div>
                              {item.name}
                              <Tag style={{ marginLeft: 10 }} color="green">
                                Còn trống
                              </Tag>
                            </div>
                          )}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
                <div className="select-inventory-top">
                  <div className="title-p">
                    <p>Chi nhánh nhận </p>
                    <span style={{ color: "red" }}>*</span>
                  </div>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    dropdownStyle={{ height: 150, width: 3000000 }}
                    placeholder="Tìm kiếm chi nhánh"
                    onSelect={handleClickOptionReceive}
                    allowClear
                    value={receive}
                  >
                    {inReceive &&
                      inReceive?.map((item) => (
                        <Select.Option
                          style={{ width: "100%" }}
                          key={item.id}
                          value={item.id}
                        >
                          {item.size ? (
                            <div>
                              {item.name}
                              <Tag style={{ marginLeft: 10 }} color="red">
                                Đã đầy{" "}
                              </Tag>
                            </div>
                          ) : (
                            <div>
                              {item.name}
                              <Tag style={{ marginLeft: 10 }} color="green">
                                Còn trống
                              </Tag>
                            </div>
                          )}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
                <div style={{ display: "flex", marginTop: 35 }}>
                  <Button onClick={handleClear}>Xoá lựa chọn</Button>
                </div>
              </div>
              {/* <div className="select-inventory-left">
                <div className="select-inventory-top">
                  <div className="title-p">
                    <p>Mã phiếu chuyển</p>
                  </div>
                  <Input placeholder="Nhập mã phiếu" onChange={handleCode} />
                </div>
                <div className="select-inventory-top"></div>
              </div> */}
            </div>
            <div className="additional-information">
              <div className="title">
                <h3>Thông tin bổ sung</h3>
              </div>
              <div>
                <div className="title-p">
                  <p>Ghi chú</p>
                </div>
                <textarea
                  rows={3}
                  style={{ width: "100%" }}
                  placeholder={"VD : Giao hàng nhanh"}
                  onChange={handleNote}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="background-export">
            <div className="title">
              <h3>Thông tin sản phẩm</h3>
            </div>
            <div className="menu">
              <div className="menu-select">
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  dropdownStyle={{ width: 1000 }}
                  placeholder="Tìm kiếm sản phẩm"
                  onSelect={handleClickOptionProduct}
                  allowClear
                >
                  {productVariant !== undefined && productVariant !== null
                    ? productVariant.map((item) => (
                        <Select.Option
                          value={[item.name, item.id]}
                          style={{ width: "100%" }}
                          key={item.id}
                        >
                          <div>
                            <div>
                              Mã hàng : {item.code} - Tên : {item.name}
                            </div>
                            <div>Số lượng : {item.quantity}</div>
                          </div>
                        </Select.Option>
                      ))
                    : null}
                </Select>
              </div>
              <div className="Modal">
                <Button type="default" onClick={() => setModal2Visible(true)}>
                  Chọn nhanh
                </Button>

                {modal2Visible && (
                  <Modal
                    title="Chọn sản phẩm"
                    centered
                    open={modal2Visible}
                    onCancel={() => setModal2Visible(false)}
                    footer={null}
                    width={"700px"}
                  >
                    <div className="select-modal">
                      <Table
                        rowKey={"id"}
                        columns={columns_modal}
                        dataSource={productVariant}
                        style={{ width: "100%" }}
                        rowSelection={rowSelection}
                        pagination={{ pageSize: 4 }}
                      />
                    </div>
                    <span style={{ color: "blue", fontWeight: 600 }}>
                      Bạn đã chọn {quantityProducts} sản phẩm
                    </span>
                  </Modal>
                )}
              </div>
            </div>
            <div>
              {products.length > 0 ? (
                <Table
                  rowKey={"id"}
                  columns={columns}
                  dataSource={products}
                  style={{
                    width: "100%",
                  }}
                  scroll={{ y: 240 }}
                  pagination={pagination}
                  onChange={(page) => {
                    setPagination({
                      current: page.current,
                    });
                  }}
                />
              ) : (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 60,
                  }}
                  description={<span>Chưa chọn sản phẩm</span>}
                ></Empty>
              )}
            </div>
            <div className="export-bottom">
              <li className="">
                <div className="">
                  <span>
                    Tổng số lượng chuyển ({quantityProducts} sản phẩm) :
                  </span>
                </div>
                <div className="">
                  <span>{total}</span>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Create;
