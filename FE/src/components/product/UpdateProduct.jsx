import React, { useEffect, useState, memo } from "react";
import { LeftOutlined } from "@ant-design/icons";
import * as Mui from "@mui/material";
import * as Antd from "antd";
import { updateProduct } from "../../api/productServices";
import ToastCustom from "../../constant/Toast";
import SelectCategory from "./SelectCategory";
import ImageUpload from "../../common_components/ImageUpload";

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

const UpdateProduct = (props) => {
  const { setIsUpdate, ...other } = { ...props };
  const [productInfo, setProductInfo] = useState(other);
  const [load, setLoad] = useState(false);
  const [variant, setVariant] = useState();
  const [index, setIndex] = useState(0);

  const [page, setPage] = useState(1);

  const onSubmit = (data) => {
    setLoad(true);
    updateProduct(productInfo)
      .then((res) => {
        if (res.status === 200) {
          ToastCustom.fire({
            icon: "success",
            title: "Sửa thành công",
          }).then();
          setIsUpdate(false);
        } else {
          ToastCustom.fire({
            icon: "error",
            title: "Có lỗi xảy ra",
          }).then();
        }
        setLoad(false);
      })
      .catch((erorr) => {
        ToastCustom.fire({
          icon: "error",
          title: "Thêm sản phẩm thất bại",
        }).then();
      });
  };
  const changeVariantName = (variants) => {
    var fixVariants = [];
    if (variants) {
      fixVariants = variants.map((variant, index) => {
        var dashIndex = variant.name.indexOf("-");
        var newName =
          productInfo?.product?.name +
          variant.name.slice(dashIndex, variant.name.length);
        variant.name = newName;
        return variant;
      });
    }
    setProductInfo({ ...productInfo, variants: fixVariants });
  };
  const setImageUrl = (url) => {
    if (variant) {
      setVariant({ ...variant, image: url });
      variant.image = url;
    }
    onDetailChange();
  };
  const onCategoriesChange = (data) => {
    productInfo.categories = data;
  };
  const onDetailChange = () => {
    if (productInfo.variants?.at(index) && variant) {
      productInfo.variants[index] = variant;
    }
  };
  useEffect(() => {
    setVariant(productInfo.variants?.at(index));
    document.title = "Cập nhật thông tin sản phẩm";
  }, []);

  const ProductInfo = () => {
    return (
      <Mui.Paper sx={{ px: 5, py: 2, height: 400 }}>
        <div>Thông tin chung</div>
        <hr></hr>

        {/* <SelectSupplier ></SelectSupplier> */}

        <Antd.Form.Item
          style={{ marginTop: 20 }}
          labelCol={{ span: 24 }}
          labelAlign="left"
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Tên sản phẩm không được để trống" },
          ]}
        >
          <Antd.Input
            size={"large"}
            onChange={(e) => {
              if (productInfo.product)
                productInfo.product.name = e.target.value;
            }}
            onBlur={() => {
              changeVariantName(productInfo.variants);
            }}
          ></Antd.Input>
        </Antd.Form.Item>

        <Antd.Form.Item name="description">
          <Antd.Input.TextArea
            rows={8}
            placeholder="Mô tả sản phẩm"
            onChange={(e) => {
              if (productInfo.product)
                productInfo.product.description = e.target.value;
            }}
          />
        </Antd.Form.Item>
      </Mui.Paper>
    );
  };
  const Variants = memo((props) => {
    return (
      <>
        <div style={{ background: "white", padding: 20 }}>
          <div>
            <Antd.Row style={{}}>
              <Antd.Col span={8} style={{ padding: 0, margin: 0 }}>
                <div style={{ height: "100%", paddingTop: 5 }}>
                  Các phiên bản:{" "}
                </div>
              </Antd.Col>
            </Antd.Row>
          </div>

          <hr />

          <Antd.Table
            dataSource={productInfo.variants}
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
                  setVariant(record);
                  if (index) setIndex(index);
                },
              };
            }}
          ></Antd.Table>
        </div>
      </>
    );
  });

  const VariantDetails = (props) => {
    return (
      <>
        <Mui.Paper sx={{ p: 3, height: 535 }}>
          <div>
            Thông tin chi tiết{" "}
            <Antd.Tag color={"orange"}>{variant?.code}</Antd.Tag>
          </div>

          <hr />
          <div style={{ margin: "5% 25%" }}>
            <ImageUpload imageUrl={variant?.image} setUrl={setImageUrl} />
          </div>

          <Antd.Row style={{ marginBottom: 5 }}>
            <Antd.Col span={6}>
              <p>Tên:</p>
            </Antd.Col>
            <Antd.Col span={18}>
              <b>{props.variant?.name}</b>
            </Antd.Col>
          </Antd.Row>

          <label>Giá nhập</label>

          <Antd.InputNumber
            size={"large"}
            min={0}
            style={{ width: "100%", marginBottom: 10 }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            defaultValue={variant?.importPrice}
            onChange={(value) => {
              if (variant) {
                variant.importPrice = value;
                onDetailChange();
              }
            }}
          ></Antd.InputNumber>
          <label>Giá bán lẻ</label>
          <Antd.InputNumber
            size={"large"}
            min={0}
            style={{ width: "100%", marginBottom: 10 }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            defaultValue={variant?.salePrice}
            onChange={(value) => {
              if (variant) {
                variant.salePrice = value;
                onDetailChange();
              }
            }}
          ></Antd.InputNumber>

          <label>Giá bán buôn</label>
          <Antd.InputNumber
            size={"large"}
            min={0}
            style={{ width: "100%", marginBottom: 10 }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            defaultValue={variant?.wholesalePrice}
            onChange={(value) => {
              if (variant) {
                variant.wholesalePrice = value;
                onDetailChange();
              }
            }}
          ></Antd.InputNumber>
        </Mui.Paper>
      </>
    );
  };

  const View = () => {
    return (
      <Antd.Form
        onFinish={onSubmit}
        initialValues={productInfo.product}
        onValuesChange={(change, value) => {}}
      >
        <Mui.Grid container spacing={2} sx={{ mb: 5 }}>
          <Mui.Grid item xs={8}>
            <ProductInfo />
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            <Mui.Grid item sx={{}}>
              <SelectCategory
                selectCategories={productInfo.categories}
                onChange={onCategoriesChange}
              />
            </Mui.Grid>
          </Mui.Grid>

          <Mui.Grid item xs={8}>
            <Variants setVariant={setVariant} variants={variant} />
          </Mui.Grid>
          <Mui.Grid item xs={4}>
            <VariantDetails variant={variant} />
          </Mui.Grid>
        </Mui.Grid>

        <div style={{ display: "flex", justifyContent: "end" }}>
          <Antd.Button
            type="primary"
            style={{ width: 150, margin: "0px 20px" }}
            danger
            onClick={() => {
              setIsUpdate(false);
            }}
          >
            Hủy
          </Antd.Button>
          <Antd.Spin spinning={load} tip={"Đang lưu..."}>
            <Antd.Button
              type="primary"
              style={{ width: 150 }}
              htmlType="submit"
            >
              Lưu
            </Antd.Button>
          </Antd.Spin>
        </div>
      </Antd.Form>
    );
  };
  return (
    <div className="p-5">
      <View></View>
    </div>
  );
};
export default UpdateProduct;
