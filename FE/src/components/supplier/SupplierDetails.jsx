import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  findAccountById,
  getImportInvoiceBySupplier,
  getSupplierById,
} from "../../api/api";
import { Col, Dropdown, Menu, Row, Space, Table, Tabs } from "antd";
import Moment from "react-moment";
import {
  DeleteOutlined,
  DownOutlined,
  InfoCircleOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import SupplierUpdate from "./SupplierUpdate";
import { ImportInvoiceColumnBySupplier } from "../../common_components/Datatablesource";
import useTitle from "../../constant/useTitle";
import ToastCustom from "../../constant/Toast";
import { deleteSupplier } from "../../api/api";
import Swal from "sweetalert2";

const SupplierDetails = () => {
  useTitle("Chi tiết nhà cung cấp", "Chi tiết nhà cung cấp");
  const navigate = useNavigate();
  const { id } = useParams();
  const [supplier, setSupplier] = useState({});
  const [importInvoiceBySupplier, setImportInvoiceBySupplier] = useState([]);
  const [account, setAccount] = useState({});
  useEffect(() => {
    getSupplierById(parseInt(id)).then((supplier) => {
      setSupplier(supplier.data);

      findAccountById(parseInt(supplier.data.accountId)).then((acc) => {
        setAccount(acc.data);
      });
    });
    getImportInvoiceBySupplier(parseInt(id)).then((supplier) => {
      setImportInvoiceBySupplier(supplier.data);
    });
  }, []);

  const [isLoadModal, setIsLoadModal] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      onDelete([id]);
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
          }).then((r) => {
            navigate("/stocker/supplier");
          });
        });
      }
    });
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: <Link to="#">Xóa nhà cung cấp</Link>,
          key: "1",
          icon: <DeleteOutlined />,
        },
        {
          label: (
            <Link to="#" onClick={() => setIsLoadModal(true)}>
              Sửa nhà cung cấp
            </Link>
          ),
          key: "2",
          icon: <InfoCircleOutlined />,
        },
      ]}
    />
  );

  const itemTabs = [
    {
      key: "1",
      label: "Lịch sử nhập hàng",
      children: (
        <>
          <Table
            dataSource={importInvoiceBySupplier}
            columns={ImportInvoiceColumnBySupplier.filter(
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
            // rowSelection={rowSelection}
          />
        </>
      ),
    },
  ];

  return (
    <div className="p-5">
      {supplier && (
        <div>
          <h2 style={{ fontSize: "15px", paddingBottom: 20 }}>
            <Link to="/stocker/supplier/">
              <LeftOutlined /> Danh sách nhà cung cấp
            </Link>
          </h2>
          <div style={{ background: "white" }}>
            <div
              style={{
                padding: 20,
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: 0,
              }}
            >
              <div>Thong tin khac</div>
              <div>
                <Dropdown overlay={menu}>
                  <div
                    style={{
                      width: "190px",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Thao tác khác
                        <DownOutlined />
                      </Space>
                    </a>
                  </div>
                </Dropdown>
              </div>
            </div>
            <hr />
            <div style={{ padding: "20px" }}>
              <Row>
                <Col span={8}>
                  <Row>
                    <Col span={8}>
                      <p>Tên nhà cung cấp: </p>
                    </Col>
                    <Col span={12}>
                      <b>{supplier.name}</b>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <p>Mã nhà cung cấp: </p>
                    </Col>
                    <Col span={12}>
                      <b>{supplier.code}</b>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <p>SĐT nhà cung cấp: </p>
                    </Col>
                    <Col span={12}>
                      <b>{supplier.phone}</b>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row>
                    <Col span={8}>
                      <p>Email nhà cung cấp: </p>
                    </Col>
                    <Col span={12}>
                      <b>{supplier.email}</b>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <p>Nhân viên phụ trách: </p>
                    </Col>
                    <Col span={12}>
                      <b>{account?.fullName}</b>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <p>Địa chỉ nhà cung cấp: </p>
                    </Col>
                    <Col span={12}>
                      <b>{supplier.address}</b>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row>
                    <Col span={8}>
                      <p>Thời giạn tạo: </p>
                    </Col>
                    <Col span={12}>
                      <b>
                        <Moment format="DD/MM/YYYY HH:mm:ss">
                          {supplier.createdAt}
                        </Moment>
                      </b>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <p>Thời gian cập nhập: </p>
                    </Col>
                    <Col span={12}>
                      <b>
                        <Moment format="DD/MM/YYYY HH:mm:ss">
                          {supplier.updateAt}
                        </Moment>
                      </b>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <p>Trạng thái giao dịch: </p>
                    </Col>
                    <Col span={12}>
                      <b>
                        {supplier.statusTransaction ? (
                          <p style={{ color: "blue" }}>Đang giao dịch</p>
                        ) : (
                          <p style={{ color: "red" }}>Ngừng giao dịch</p>
                        )}
                      </b>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
          {isLoadModal && (
            <SupplierUpdate
              supplier={supplier}
              isVisible={isLoadModal}
              setIsVisible={() => setIsLoadModal(false)}
            />
          )}
        </div>
      )}
      {<Tabs defaultActiveKey="1" items={itemTabs} />}
    </div>
  );
};
export default SupplierDetails;
