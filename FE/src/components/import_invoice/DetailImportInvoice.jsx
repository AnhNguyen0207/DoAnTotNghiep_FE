import { Link, useParams } from "react-router-dom";
import "../../styles/Tab.css";
import React, { useEffect, useState } from "react";
import {
  getDetailImportInvoice,
  getDetailsImportReturn,
  getHistoryStatusImportInvoice,
  updateStatusInvoice,
} from "../../api/api";
import { Button, Col, Row, Steps, Table, Tag } from "antd";
import moment from "moment";
import { LeftOutlined, ShopFilled } from "@ant-design/icons";
import { columnsDetailImportInvoice } from "../../common_components/Datatablesource";
import ToastCustom from "../../constant/Toast";
import PaymentImport from "./PaymentImport";
import ImportWarehouse from "./ImportWarehouse";
import ReturnInvoiceImport from "./ReturnInvoiceImport";
import ImportInvoiceHistory from "./ImportInvoiceHistory";
import { useSelector } from "react-redux";
import useTitle from "../../constant/useTitle";

const DetailImportInvoice = () => {
  useTitle("Chi tiết đơn nhập hàng", "Chi tiết đơn nhập hàng");

  const { code } = useParams();

  const [detailInvoices, setDetailInvoices] = useState();
  const [reload, setReload] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [invoiceStatusHistory, setInvoiceStatusHistory] = useState([]);

  const [createDate, setCreatDate] = useState("");
  const [importDate, setImportDate] = useState("----");
  const [returnInvoice, setReturnInvoice] = useState([]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getDetailImportInvoice(code).then((result) => {
      setDetailInvoices(result.data);
      result.data.anImport.isDone && setCurrentStatus(2);
      getHistoryStatusImportInvoice(result.data?.anImport.id).then((result) => {
        setInvoiceStatusHistory(result.data);
      });
    });
  }, [reload]);

  useEffect(() => {
    getDetailsImportReturn(code).then((res) => {
      setReturnInvoice(res.data);
    });
  }, []);

  useEffect(() => {
    const invoiceStatusHistoryList = invoiceStatusHistory.filter(
      (obj) => obj.statusName !== "Tạo phiếu trả hàng"
    );
    if (invoiceStatusHistoryList.length === 2) {
      setCreatDate(invoiceStatusHistoryList[1].createdAt);
      setImportDate(invoiceStatusHistoryList[0].createdAt);
      setFullName(invoiceStatusHistoryList[0].fullName);
      setPhoneNumber(invoiceStatusHistoryList[0].phoneNumber);
    }
    if (invoiceStatusHistoryList.length === 3) {
      setCreatDate(invoiceStatusHistoryList[2].createdAt);
      setImportDate(invoiceStatusHistoryList[1].createdAt);
      setFullName(invoiceStatusHistoryList[1].fullName);
      setPhoneNumber(invoiceStatusHistoryList[1].phoneNumber);
    }
  }, [invoiceStatusHistory]);

  const updateStatusPaidPayment = () => {
    const importId = detailInvoices?.anImport.id;
    updateStatusInvoice(importId, "paidPayment", user.id).then(() => {
      ToastCustom.fire({
        icon: "success",
        title: "Xác nhận thanh toán thành công",
      }).then();
      setReload(!reload);
    });
  };
  const updateStatusImportWarehouse = () => {
    const importId = detailInvoices?.anImport.id;
    updateStatusInvoice(importId, "importWarehouse", user.id).then(() => {
      ToastCustom.fire({
        icon: "success",
        title: "Xác nhận nhập kho thành công",
      }).then();
      setReload(!reload);
    });
  };

  return (
    <div className="p-5">
      <h2 style={{ fontSize: "15px", paddingBottom: "20px" }}>
        <Link to="/coordinator/purchase_orders">
          <LeftOutlined /> Danh sách đơn hàng
        </Link>
      </h2>

      {detailInvoices && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 style={{ fontSize: "30px", margin: 0, marginRight: 10 }}>
                {detailInvoices?.anImport.code}
              </h1>
              <span style={{ marginTop: 10 }}>{createDate}</span>
            </div>
            <div style={{ width: "32%" }}>
              {(() => {
                const invoiceStatusHistoryList = invoiceStatusHistory.filter(
                  (obj) => obj.statusName !== "Tạo phiếu trả hàng"
                );
                if (invoiceStatusHistoryList.length === 3) {
                  return (
                    <Steps
                      current={currentStatus}
                      size="small"
                      labelPlacement="vertical"
                      items={[
                        {
                          title: "Đặt hàng",
                          description: moment(
                            invoiceStatusHistoryList[2].createdAt
                          ).format("DD/MM/YYYY HH:mm"),
                        },
                        {
                          title: "Nhập kho",
                          description: moment(
                            invoiceStatusHistoryList[1].createdAt
                          ).format("DD/MM/YYYY HH:mm"),
                        },
                        {
                          title: "Hoàn thành",
                          description: moment(
                            invoiceStatusHistoryList[0].createdAt
                          ).format("DD/MM/YYYY HH:mm"),
                          status: "finish",
                        },
                      ]}
                    />
                  );
                } else if (
                  invoiceStatusHistoryList.length === 2 &&
                  invoiceStatusHistoryList[0].statusName ===
                    "Tạo phiếu nhập kho"
                ) {
                  return (
                    <Steps
                      current={currentStatus + 1}
                      size="small"
                      labelPlacement="vertical"
                      items={[
                        {
                          title: "Đặt hàng",
                          description: moment(
                            invoiceStatusHistoryList[1].createdAt
                          ).format("DD/MM/YYYY HH:mm"),
                        },
                        {
                          title: "Nhập kho",
                          description: moment(
                            invoiceStatusHistoryList[0].createdAt
                          ).format("DD/MM/YYYY HH:mm"),
                          status: "finish",
                        },
                        {
                          title: "Hoàn thành",
                        },
                      ]}
                    />
                  );
                } else if (
                  invoiceStatusHistoryList.length === 2 &&
                  invoiceStatusHistoryList[0].statusName ===
                    "Thanh toán hóa đơn nhập hàng"
                ) {
                  return (
                    <Steps
                      current={currentStatus}
                      size="small"
                      labelPlacement="vertical"
                      items={[
                        {
                          title: "Đặt hàng",
                          description: moment(
                            invoiceStatusHistoryList[1].createdAt
                          ).format("DD/MM/YYYY HH:mm"),
                          status: "finish",
                        },
                        {
                          title: "Nhập kho",
                        },
                        {
                          title: "Hoàn thành",
                        },
                      ]}
                    />
                  );
                } else if (invoiceStatusHistoryList.length === 1) {
                  return (
                    <Steps
                      current={currentStatus}
                      size="small"
                      labelPlacement="vertical"
                      items={[
                        {
                          title: "Đặt hàng",
                          description: moment(
                            invoiceStatusHistoryList[0].createdAt
                          ).format("DD/MM/YYYY HH:mm"),
                          status: "finish",
                        },
                        {
                          title: "Nhập kho",
                        },
                        {
                          title: "Hoàn thành",
                        },
                      ]}
                    />
                  );
                }
              })()}
            </div>
          </div>
          <div style={{ marginTop: "45px" }}>
            <Row gutter={24}>
              <Col span={16}>
                <div className="block" style={{ padding: 0 }}>
                  <div
                    style={{ padding: 20, paddingBottom: 5, marginBottom: 5 }}
                  >
                    <p style={{ margin: 0, fontSize: "16px" }}>
                      <b>Thông tin nhà cung cấp</b>
                    </p>
                  </div>
                  <hr style={{ margin: 0 }} />
                  <div style={{ padding: 20 }}>
                    <Row>
                      <Link to="#" style={{ marginBottom: 20 }}>
                        <b style={{ textTransform: "uppercase" }}>
                          <span>
                            <ShopFilled />
                          </span>{" "}
                          {detailInvoices.supplier.name}
                        </b>
                      </Link>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Row>
                          <Col span={3}>
                            <p>Mã: </p>
                          </Col>
                          <Col span={21}>
                            <p style={{ color: "#605c5c", fontWeight: 500 }}>
                              {detailInvoices.supplier.code}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={3}>
                            <p>Email: </p>
                          </Col>
                          <Col span={21}>
                            <p style={{ color: "#605c5c", fontWeight: 500 }}>
                              {detailInvoices.supplier.email}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row>
                          <Col span={5}>
                            <p>Trạng thái: </p>
                          </Col>
                          <Col span={19}>
                            <p>
                              {detailInvoices.supplier.statusTransaction ? (
                                <Tag color="success">Đang giao dịch</Tag>
                              ) : (
                                <Tag color="error">Ngừng giao dịch</Tag>
                              )}
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={5}>
                            <p>Địa chỉ: </p>
                          </Col>
                          <Col span={19}>
                            <p style={{ color: "#605c5c", fontWeight: 500 }}>
                              {detailInvoices.supplier.address}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="block" style={{ padding: 0 }}>
                  <div
                    style={{
                      padding: 20,
                      paddingBottom: 5,
                      marginBottom: "5px",
                    }}
                  >
                    <p style={{ marginBottom: 0, fontSize: "16px" }}>
                      <b>Thông tin sản phẩm</b>
                    </p>
                  </div>
                  <hr />
                  <div style={{ padding: 20 }}>
                    <Table
                      rowKey={"id"}
                      columns={columnsDetailImportInvoice}
                      dataSource={detailInvoices.anImport.detailsImports}
                      pagination={{ pageSize: 5 }}
                    />
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="block" style={{ padding: 0 }}>
                  <div
                    style={{
                      padding: 20,
                      paddingBottom: 5,
                      marginBottom: "5px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ marginBottom: 0, fontSize: "16px" }}>
                      <b>Thông tin đơn nhập</b>
                    </p>
                    {detailInvoices.anImport.isDone ? (
                      <Tag color="success">Hoàn thành</Tag>
                    ) : (
                      <Tag color="warning">Đang giao dịch</Tag>
                    )}
                  </div>
                  <hr />
                  <div style={{ padding: 20 }}>
                    <Row>
                      <Col span={8}>Kho :</Col>
                      <Col span={12}>{detailInvoices.inventoryName}</Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <Col span={8}>Ngày hẹn giao :</Col>
                      <Col span={12}>
                        {detailInvoices.anImport.deliveryDate === "0"
                          ? "----"
                          : detailInvoices.anImport.deliveryDate}
                      </Col>
                    </Row>
                  </div>
                  <div style={{ padding: "10px 20px" }}>
                    <ImportInvoiceHistory
                      reload={reload}
                      data={invoiceStatusHistory}
                    />
                  </div>
                </div>

                <PaymentImport
                  updateStatusPaidPayment={updateStatusPaidPayment}
                  total={detailInvoices?.anImport.totalPrice}
                  isPaid={detailInvoices?.anImport.isPaid}
                />

                <ImportWarehouse
                  updateStatusImportWarehouse={updateStatusImportWarehouse}
                  invoice={detailInvoices}
                  createDate={createDate}
                  importDate={importDate}
                  fullName={fullName}
                  phoneNumber={phoneNumber}
                />

                <ReturnInvoiceImport
                  returnInvoice={returnInvoice}
                  invoice={detailInvoices}
                />
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailImportInvoice;
