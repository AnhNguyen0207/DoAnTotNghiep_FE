import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import React, { useEffect, useState, memo } from "react";
import { Col, Dropdown, Menu, Row, Space } from "antd";
import Moment from "react-moment";
import {
  DeleteOutlined,
  DownOutlined,
  InfoCircleOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import * as Mui from "@mui/material";
import * as Antd from "antd";
import {
  deleteProductById,
  deleteVariantsById,
  getProductById,
} from "../../api/productServices";
import Swal from "sweetalert2";
import ToastCustom from "../../constant/Toast";
import UpdateProduct from "./UpdateProduct";
import useTitle from "../../constant/useTitle";

const ProductDetails = () => {
  useTitle("Chi tiết sản phẩm", "Chi tiết sản phẩm");
  const { id, backcode } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [focusVariant, setFocusVariant] = useState();
  searchParams.get("backcode");

  const [isUpdate, setIsUpdate] = useState(false);
  const [productInfo, setProductInfo] = useState();
  const [page, setPage] = useState(1);
  const [openDes, setOpenDes] = useState(false);
  const openDescription = () => {
    setOpenDes(true);
  };
  const setActionUpdate = (status) => {
    setIsUpdate(status);
  };
  const navigate = useNavigate();
  const loadData = () => {
    getProductById(Number(id))
      .then((rs) => {
        setProductInfo(rs?.data);
        setFocusVariant(rs?.data.variants[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteProduct = (iD) => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn không thể hồi phục lại dữ liệu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed && id) {
        deleteProductById(id)
          .then((res) => {
            if (res.status === 200) {
              ToastCustom.fire({
                icon: "success",
                title: "Xóa thành công",
              });
              navigate("/warehouse/products");
            }
          })
          .catch((error) => {
            ToastCustom.fire({
              icon: "error",
              title: "Xóa Thất bại",
            });
          });
      }
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    if (!isUpdate) loadData();
  }, [isUpdate]);

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        if (productInfo?.product?.id) {
          handleDeleteProduct(productInfo?.product?.id);
        } else {
          ToastCustom.fire({
            icon: "warning",
            title: "Sản phẩm không tồn tại trong kho ko thể xóa",
          });
        }
        break;
      case "2":
        if (productInfo?.product?.id) {
          setIsUpdate(true);
        } else {
          ToastCustom.fire({
            icon: "warning",
            title: "Sản phẩm không tồn tại trong kho không thể sửa",
          });
        }
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        // {
        //   key: "1",
        //   label: (
        //     <Antd.Button style={{ width: "100%" }} type="text" danger>
        //       Xóa Sản phẩm
        //       <DeleteOutlined />
        //     </Antd.Button>
        //   ),
        // },
        {
          label: (
            <Antd.Button style={{ width: "100%" }} type="text">
              Sửa sản phẩm
              <InfoCircleOutlined />
            </Antd.Button>
          ),
          key: "2",
        },
      ]}
    />
  );

  const Product = () => {
    var product = productInfo?.product;
    return (
      <Mui.Paper style={{ height: 350 }}>
        <div style={{ background: "white" }}>
          <div
            style={{
              padding: 20,
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: 0,
            }}
          >
            <div>Thông tin sản phẩm</div>
            <div>
              <Dropdown overlay={menu}>
                <div
                  style={{
                    width: "190px",
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  <Space>
                    Thao tác khác
                    <DownOutlined />
                  </Space>
                </div>
              </Dropdown>
            </div>
          </div>
          <hr />
          <div style={{ padding: "20px" }}>
            <Row>
              <Col span={12}>
                <Row>
                  <Col span={8}>
                    <p>Tên sản phẩm: </p>
                  </Col>
                  <Col span={12}>
                    <b>{product?.name}</b>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <p>Mã sản phẩm: </p>
                  </Col>
                  <Col span={12}>
                    <Antd.Tag color="orange">{product?.code}</Antd.Tag>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={8}>
                    <p>Ngày tạo: </p>
                  </Col>
                  <Col span={12}>
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                      {product?.createAt}
                    </Moment>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <p>Ngày cập nhật: </p>
                  </Col>
                  <Col span={12}>
                    <Moment format="DD/MM/YYYY HH:mm:ss">
                      {product?.createAt}
                    </Moment>
                  </Col>
                </Row>
              </Col>
            </Row>

            <p style={{ marginTop: 20 }}>Mô tả:</p>
            <p
              style={{
                height: 113,
                overflow: "hidden",
                maxHeight: 113,
                textOverflow: "ellipsis",
                marginBottom: 0,
              }}
            >
              {product?.description}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                fontStyle: "italic",
                margin: 0,
                padding: 0,
              }}
              onClick={openDescription}
            >
              Xem thêm&gt;&gt;
            </div>
          </div>
        </div>
      </Mui.Paper>
    );
  };
  const Variants = memo((props) => {
    const variantCol = [
      {
        title: "Mã SP",
        dataIndex: "code",
        key: "code",
        width: "15%",
        render: (code) => {
          return <Antd.Tag color="orange"> {code}</Antd.Tag>;
        },
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
      },
    ];
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const handleOnDeleteVariants = () => {
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
          deleteVariantsById(selectedRowKeys)
            .then((response) => {
              if (response.status === 200) {
                ToastCustom.fire({
                  icon: "success",
                  title: "Xóa phiên bản thành công",
                }).then();
                loadData();
              }
            })
            .catch((error) => {
              ToastCustom.fire({
                icon: "error",
                title: "Có lỗi xảy ra",
              }).then();
            });
        }
      });
    };

    return (
      <div>
        <div style={{ background: "white", padding: 20 }}>
          <div>
            <Antd.Row style={{}}>
              <Antd.Col span={8} style={{ padding: 0, margin: 0 }}>
                <div style={{ height: "100%", paddingTop: 5 }}>
                  Các phiên bản:{" "}
                </div>
              </Antd.Col>
              <Antd.Col span={8}>
                {hasSelected ? (
                  <span>Đang chọn {selectedRowKeys.length} phiên bản</span>
                ) : null}
              </Antd.Col>
              <Antd.Col
                span={8}
                style={{ display: "flex", justifyContent: "right" }}
              >
                <Antd.Button
                  disabled={!hasSelected}
                  icon={<DeleteOutlined />}
                  danger
                  onClick={handleOnDeleteVariants}
                >
                  Xóa
                </Antd.Button>
              </Antd.Col>
            </Antd.Row>
          </div>

          <hr />

          <Antd.Table
            dataSource={props.variants}
            sticky
            columns={variantCol}
            rowKey="id"
            bordered
            pagination={{
              pageSize: 6,
              current: page,
              onChange(page, pageSize) {
                setPage(page);
              },
            }}
            style={{ height: 450 }}
            onRow={(record, index) => {
              return {
                onClick: (event) => {
                  props.setVariant(record);
                },
              };
            }}
            rowSelection={rowSelection}
          ></Antd.Table>
        </div>
      </div>
    );
  });
  const VariantDetails = (props) => {
    return (
      <>
        <Mui.Paper sx={{ p: 3, height: 535 }}>
          <div>Thông tin chi tiết</div>
          <hr />
          <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: 10 }}>
            <Antd.Image
              width={"160px"}
              src={
                focusVariant?.image
                  ? focusVariant.image
                  : "https://phapluat.me/images/noimage.jpg"
              }
            ></Antd.Image>
          </div>
          <Antd.Row style={{ marginTop: 30 }}>
            <Antd.Col span={12}>
              <p>Tên sản phẩm:</p>
            </Antd.Col>
            <Antd.Col span={12}>
              <b>{props.variant?.name}</b>
            </Antd.Col>
          </Antd.Row>
          <Antd.Row>
            <Antd.Col span={12}>
              <p>Mã sản phẩm:</p>
            </Antd.Col>
            <Antd.Col span={12}>
              <Antd.Tag color="orange"> {props.variant?.code}</Antd.Tag>
            </Antd.Col>
          </Antd.Row>
          <Antd.Row>
            <Antd.Col span={12}>
              <p>Giá nhập:</p>
            </Antd.Col>
            <Antd.Col span={12}>
              <b>
                {(props.variant?.importPrice + "").replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1,"
                )}
              </b>
            </Antd.Col>
          </Antd.Row>
          <Antd.Row>
            <Antd.Col span={12}>
              <p>Giá bán lẻ:</p>
            </Antd.Col>
            <Antd.Col span={12}>
              <b>
                {(props.variant?.salePrice + "").replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1,"
                )}
              </b>
            </Antd.Col>
          </Antd.Row>
          <Antd.Row>
            <Antd.Col span={12}>
              <p>Giá bán buôn:</p>
            </Antd.Col>
            <Antd.Col span={12}>
              <b>
                {(props.variant?.wholesalePrice + "").replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1,"
                )}
              </b>
            </Antd.Col>
          </Antd.Row>
        </Mui.Paper>
      </>
    );
  };

  const View = () => {
    return (
      <div>
        <h2 style={{ fontSize: "15px", paddingBottom: 20 }}>
          <Link to="/warehouse/products">
            <LeftOutlined /> Danh sách sản phẩm
          </Link>
          {/* {searchParams.get("backcode")?.toString() === "statistic" ? (
              <Link to="/statistics">
                <LeftOutlined /> Thống kê
              </Link>
            ) : null} */}
        </h2>

        <Mui.Grid container spacing={2} sx={{ mb: 10 }}>
          <Mui.Grid item xs={8} sx={{ mb: 2 }}>
            <Product />
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            <Mui.Grid item sx={{}}>
              <Mui.Paper style={{ width: "100%", height: 150, padding: 20 }}>
                <div>Danh mục sản phẩm</div>
                <hr></hr>
                {productInfo?.categories
                  ? productInfo.categories.map((category, index) => {
                      return (
                        <Antd.Tag key={category.id} color={"blue"}>
                          {category.name}
                        </Antd.Tag>
                      );
                    })
                  : null}
              </Mui.Paper>
              <Mui.Paper
                style={{
                  width: "100%",
                  height: 190,
                  padding: 20,
                  marginTop: 20,
                }}
              >
                <div>Thông tin khác</div>
                <hr></hr>
              </Mui.Paper>
            </Mui.Grid>
          </Mui.Grid>

          <Mui.Grid item xs={8}>
            <Variants
              setVariant={setFocusVariant}
              variants={productInfo?.variants}
            />
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            {focusVariant ? <VariantDetails variant={focusVariant} /> : null}
          </Mui.Grid>
        </Mui.Grid>
      </div>
    );
  };
  return (
    <div className="p-5">
      <Antd.Modal
        width={1000}
        title="Mô tả sản phẩm"
        open={openDes}
        footer={null}
        onCancel={() => {
          setOpenDes(false);
        }}
      >
        <textarea
          style={{ width: "100%", height: "500px", padding: 10 }}
          disabled={true}
          value={productInfo?.product?.description}
        />
      </Antd.Modal>

      {isUpdate && productInfo?.product ? (
        <UpdateProduct
          product={productInfo?.product}
          variants={productInfo?.variants}
          categories={productInfo?.categories}
          setIsUpdate={setActionUpdate}
        ></UpdateProduct>
      ) : (
        <View></View>
      )}
    </div>
  );
};
export default ProductDetails;
