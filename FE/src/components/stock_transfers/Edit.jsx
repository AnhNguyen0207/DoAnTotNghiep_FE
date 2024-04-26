/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import {
  Select,
  Popconfirm,
  Input,
  PageHeader,
  message,
  Spin,
  Empty,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import "../../styles/file.css";
import {
  findInventoryById,
  getAllInventory,
  getProductVariants,
} from "../../api/inventory";
import { Table } from "antd";
import { useMutation } from "@tanstack/react-query";
import { findExportById, updateExport } from "../../api/export";
import {
  creatDetailExport,
  deleteDetailByExport,
  deleteDetailExport,
  findDetailByExport,
} from "../../api/detailExport";
import { Button } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  createExportStatus,
  findExportStatusById,
} from "../../api/exportStatus";
import moment from "moment";
import ToastCustom from "../../constant/Toast";

const Edit = () => {
  const { id } = useParams();
  const item = Number.parseInt(id);

  const [exportId, setExportId] = useState();
  const [loading, setLoading] = useState(false);
  const [inventoryId, setInventoryId] = useState();
  const [productVariant, setProductVariant] = useState();
  const navigate = useNavigate();
  const [exportById, setExportById] = useState();
  const [detailExport, setDetailExport] = useState([]);
  const [status, setStattus] = useState();
  const [total, setTotal] = useState(0);
  const [spin, setSpin] = useState(true);
  const [listInventory, setListInventory] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
  });
  const [pagination1, setPagination1] = useState({
    current: 1,
    pageSize: 3,
  });
  const [inSend, setInSend] = useState(listInventory);
  const [inReceive, setInReceive] = useState(listInventory);
  const [a, setA] = useState(1);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const dataEdit = async () => {
    const exportData = await findExportById(item);
    const detailExport = await findDetailByExport(item);
    const exportStatus = await findExportStatusById(item);
    setExportById(exportData);
    setDetailExport(detailExport);
    setStattus(exportStatus);
    setInventoryId(exportData.exportInventory.id);
  };
  useEffect(() => {
    dataEdit();
    document.title = "Cập nhật phiếu chuyển hàng";
    setTimeout(() => {
      setSpin(false);
    }, 200);
  }, []);

  useEffect(() => {
    let b = 0;
    detailExport.map((e) => {
      b += e.quantity * 1;
    });
    setTotal(b);
  }, [detailExport]);

  const handleDelete = async (e) => {
    const newData = detailExport.find(
      (item) => item.productVariant.id * 1 === e * 1
    );
    await deleteDetailExport(newData?.id);
    setDetailExport(
      detailExport.filter((item) => item.productVariant.id * 1 !== e * 1)
    );
  };

  const handleQuantity = (e) => {
    const quantity = e.target.value;
    const id = e.target.id * 1;
    const check = productVariant.find((a) => a.id === id);
    if (quantity * 1 <= 0) {
      message.warning("Số lượng sản phẩm không hợp lệ");
      const newData = detailExport.filter(
        (item) => item.productVariant.id * 1 !== id
      );
      setDetailExport(newData);
    }
    if (quantity > check.quantity) {
      message.warning("Số lượng sản phẩm có trong kho không đủ");
    } else {
      setDetailExport((prev) => {
        prev.map((prod) => {
          if (prod.productVariant.id === id) {
            prod.quantity = quantity * 1;
          }
        });
        return [...prev];
      });
    }
  };

  const allQueries = async () => {
    if (!inventoryId) return;
    const productVariant = await getProductVariants(inventoryId);
    const getListInventory = await getAllInventory();
    setProductVariant(productVariant.productVariants);
    setListInventory(getListInventory);
  };

  useEffect(() => {
    allQueries();
  }, [inventoryId]);

  const data = detailExport;
  const columns = [
    {
      title: "Mã hàng",
      dataIndex: "productVariant",
      render: (text) => {
        return <div>{text?.code}</div>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productVariant",

      render: (text) => {
        return <div>{text?.name}</div>;
      },
    },
    {
      title: "Số lượng chuyển",
      dataIndex: ["quantity", "productVariant"],
      render: (a, text) => {
        // const check = productVariant.find(
        //   (a: any) => a.id === text?.productVariant?.id
        // );
        return (
          <>
            {/* {text?.productVariant?.quantity === 0 ? } */}

            {status?.status === 1 ? (
              <div>{text?.quantity}</div>
            ) : (
              <Input
                type={"number"}
                style={{ width: "50%" }}
                onChange={handleQuantity}
                id={text?.productVariant?.id + ""}
                key={text?.productVariant?.id}
                value={text.quantity}
                min={0}
                size={"middle"}
              />
            )}
          </>
        );
      },
    },
    {
      dataIndex: ["productVariant"],
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
            <DeleteTwoTone
              style={
                status?.status === 1 ? { display: "none" } : { display: "flex" }
              }
            />
          </Popconfirm>
        );
      },
    },
  ];

  const handleClickOptionProduct = (e) => {
    const id = e[1] * 1;
    const isFound = detailExport.findIndex(
      (element) => element.productVariant.id === id
    );
    const hanldeClick = async () => {
      const getProductById = productVariant.find((a) => a.id === id);
      if (getProductById.quantity === 0) {
        message.warning("Sản phẩm đã hết hàng");
      } else {
        setDetailExport([
          {
            export: item,
            productVariant: getProductById,
            quantity: 1,
          },
          ...detailExport,
        ]);
      }
    };
    if (isFound < 0) {
      hanldeClick();
    } else {
      message.warning(
        <div style={{ color: "red" }}>Sản phẩm đã được chọn</div>
      );
      setDetailExport((prev) => {
        prev.map((prod) => {
          if (prod.productVariant.id === id) {
            prod.quantity = prod.quantity * 1 + 1;
          }
        });
        return [...prev];
      });
    }
  };

  const dataProduct = productVariant;

  const handleSubmit = async () => {
    setLoading(true);
    if (detailExport.length > 0) {
      const saveExport = await updateExport(item, exportById);
      const exportId = saveExport.data.id;
      setExportId(exportId);
      await deleteDetailByExport(exportId);
      const detailExports = detailExport.map((e) => {
        return {
          productVariant: e.productVariant,
          quantity: e.quantity,
          export: item,
          code: status?.code,
        };
      });
      creatDetailExportSubmit.mutate(detailExports);
      await createExportStatus({
        parentId: status?.id,
        status: status?.status,
        note: status?.note,
        dateUpdate: moment(new Date()).format("DD/MM/YYYY HH:mm").toString(),
      });
    } else {
      ToastCustom.fire({
        icon: "error",
        title: "Vui lòng chọn sản phẩm vào phiếu chuyển hàng",
      })
    }
    setLoading(false);
  };

  const creatDetailExportSubmit = useMutation((item) =>
    creatDetailExport(item)
  );

  const handleStatus = async (id) => {
    ToastCustom.fire({
      icon: "success",
      title: "Cập nhật phiếu chuyển hàng thành công",
    });
    navigate(`/coordinator/storage/stock_transfers/${id}`, { replace: true });
  };

  if (creatDetailExportSubmit.isSuccess) {
    handleStatus(exportId);
  }

  // // Edit ----------------------------------------------------
  if (id === undefined) {
    return <div></div>;
  }

  useEffect(() => {
    if (listInventory === undefined) {
      setA(a + 1);
    }
    setInSend(listInventory);
    setInReceive(listInventory);
  }, [a]);

  const handleClickOptionSend = async (e) => {
    setInventoryId(e);
    setDetailExport([]);
    const exportByInventory = await findInventoryById(e);
    setExportById((prev) => ({
      ...prev,
      exportInventory: exportByInventory,
    }));

    setInReceive(listInventory.filter((i) => i.id !== e));
  };

  const handleClickOptionReceive = async (e) => {
    const exportReceive = await findInventoryById(e);
    setExportById((prev) => ({
      ...prev,
      receiveInventory: exportReceive,
    }));

    setInSend(listInventory.filter((i) => i.id !== e));
  };

  const handleCode = (e) => {
    setStattus((prev) => ({
      ...prev,
      code: e.target.value,
    }));
  };
  const handleNote = (e) => {
    setStattus((prev) => ({
      ...prev,
      note: e.target.value,
    }));
  };

  const columns_modal = [
    {
      title: "Mã hàng",
      dataIndex: "code",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: ["quantity", "id"],
      render: (a, text) => {
        return (
          <Input
            type={"number"}
            style={{ width: "50%" }}
            onChange={handleQuantity}
            id={text?.id + ""}
            key={text?.id}
            defaultValue={1}
            min={1}
            size={"middle"}
          />
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record, selected, selectedRows) => {
      const id = record.id;

      if (selected) {
        const isFound = detailExport.findIndex(
          (element) => element.productVariant.id === id
        );
        const hanldeClick = async () => {
          const getProductById = productVariant.find((a) => a.id === id);
          if (getProductById.quantity === 0) {
            message.warning("Sản phẩm đã hết hàng");
          } else {
            setDetailExport([
              {
                export: item,
                productVariant: getProductById,
                quantity: 1,
              },
              ...detailExport,
            ]);
          }
        };
        if (isFound < 0) {
          hanldeClick();
        } else {
          message.warning(
            <div style={{ color: "red" }}>Sản phẩm đã được chọn</div>
          );
          setDetailExport((prev) => {
            prev.map((prod) => {
              if (prod.productVariant.id === id) {
                prod.quantity = prod.quantity * 1 + 1;
              }
            });
            return [...prev];
          });
        }
      } else {
        const newData = detailExport.filter(
          (item) => item.productVariant.id * 1 !== id
        );
        setDetailExport(newData);
      }
    },
    onSelectAll(selected, selectedRows, changeRows) {
      setDetailExport(
        selectedRows.map((e) => ({
          export: item,
          productVariant: e,
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
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Cập nhật phiếu chuyển hàng"
            subTitle=""
            extra={[
              <Button
                key="2"
                onClick={() => window.history.back()}
                className="rounded-md"
                type="primary"
                ghost
                style={{ width: 80 }}
              >
                Thoát
              </Button>,

              <Button
                key="1"
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                className="rounded-md"
                style={{ width: 80 }}
              >
                Lưu
              </Button>,
            ]}
          />
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
                    // defaultValue={1}
                    value={exportById?.exportInventory?.id}
                    disabled
                  >
                    {inSend &&
                      inSend.map((item) => (
                        <Select.Option
                          style={{ width: "100%" }}
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
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
                    value={exportById?.receiveInventory?.id}
                    disabled
                  >
                    {inReceive &&
                      inReceive.map((item) => (
                        <Select.Option
                          style={{ width: "100%" }}
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              </div>
              <div className="select-inventory-left">
                <div className="select-inventory-top">
                  <div className="title-p">
                    <p>Mã phiếu chuyển</p>
                  </div>
                  <Input
                    placeholder="Nhập mã phiếu"
                    onChange={handleCode}
                    value={detailExport[0]?.code}
                    disabled={status?.status === 1 ? true : false}
                  />
                </div>
                <div className="select-inventory-top"></div>
              </div>
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
                  value={status?.note}
                  onChange={handleNote}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="background-export">
            <div className="title">
              <h3>Thông tin sản phẩm</h3>
            </div>
            {status?.status === 1 ? (
              " "
            ) : (
              <div className="menu">
                <div className="menu-select">
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    dropdownStyle={{ width: 1000 }}
                    placeholder="Tìm kiếm sản phẩm"
                    onSelect={handleClickOptionProduct}
                  >
                    {productVariant !== undefined ? (
                      productVariant.map((item) => (
                        <Select.Option
                          value={[item.name, item.id]}
                          style={{ width: "100%" }}
                          key={item.id}
                        >
                          <div>
                            <div>{item.name}</div>
                            <div>
                              Tồn : {item.quantity} | Có thể bán :{" "}
                              {item.quantity}
                            </div>
                          </div>
                        </Select.Option>
                      ))
                    ) : (
                      <Spin />
                    )}
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
                      width={"1000px"}
                    >
                      <div className="select-modal">
                        <Table
                          rowKey={"id"}
                          columns={columns_modal}
                          dataSource={dataProduct}
                          style={{ width: "100%" }}
                          scroll={{ y: 240 }}
                          rowSelection={rowSelection}
                          pagination={pagination1}
                          onChange={(page) => {
                            setPagination1({
                              current: page.current,
                            });
                          }}
                        />
                      </div>
                      <span style={{ color: "blue", fontWeight: 600 }}>
                        Bạn đã chọn {detailExport.length} sản phẩm
                      </span>
                    </Modal>
                  )}
                </div>
              </div>
            )}
            <div>
              {detailExport.length > 0 ? (
                <Table
                  rowKey={"id"}
                  columns={columns}
                  dataSource={data}
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
                    Tổng số lượng chuyển ({detailExport.length} sản phẩm) :
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
export default Edit;
