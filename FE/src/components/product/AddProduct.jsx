import { Link, useNavigate } from "react-router-dom";

import { LeftOutlined } from "@ant-design/icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as Mui from "@mui/material";
import * as Antd from "antd";
import { addProduct } from "../../api/productServices";
import { getSuppliers } from "../../api/api";
import ToastCustom from "../../constant/Toast";
import { getCategories } from "../../api/apiCategory";
import SelectCategory from "./SelectCategory";
import SelectOption from "./SelectOption";
import ImageUpload from "../../common_components/ImageUpload";
import useTitle from "../../constant/useTitle";

function AddProduct(props) {
  //init values
  useTitle("Thêm sản phẩm", "Thêm sản phẩm");
  const initOptions = [];
  const valuesForName = [];
  const variantsAll = [];
  const initVariants = [];
  let getProduct = localStorage.getItem("product");
  const initProduct = getProduct
    ? JSON.parse(getProduct)
    : {
        code: "",
        productId: 0,
        name: "",
        description: "",
        wholesalePrice: 0,
        salePrice: 0,
        importPrice: 0,
      };
  //state
  const [options, setOptions] = useState(initOptions);
  const [suppliers, setSuppliers] = useState([]);
  const [variants, setVariants] = useState(initVariants);
  const [product, setProduct] = useState(props.product);
  const [categories, setCategories] = useState([]);
  const [selectCategories, setSelectCategories] = useState([]);

  const [open, setOpen] = React.useState(false);

  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();
  //function
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onImageChange = (url) => {
    setImageUrl(url);
  };
  const onSubmit = (data) => {
    let { salePrice, wholesalePrice, importPrice, ...other } = { ...data };
    let newProduct = { ...other, accountId: 1, statusId: 1 };

    let body = {
      product: newProduct,
      variants: variants,
      categories: selectCategories,
    };

    if (options.length == 0) {
      body = {
        ...body,
        variants: [
          {
            name: newProduct.name,
            salePrice,
            image: imageUrl,
            importPrice,
            wholesalePrice,
          },
        ],
      };
    } else {
      var variantsSt1 = variants.map((variant, index) => {
        var x = variant;
        x.image = imageUrl;
        return x;
      });
      body = {
        ...body,
        variants: variants,
      };
    }
    handleOpen();

    addProduct(body)
      .then((response) => {
        if (response.status === 200 && response.data) {
          localStorage.removeItem("product");
          ToastCustom.fire({
            icon: "success",
            title: "Thêm sản phẩm thành công",
          }).then();
          localStorage.removeItem("products");
          handleClose();
          navigate(`/warehouse/products/${response.data.product.id}`);
        }
      })
      .catch((erorr) => {
        ToastCustom.fire({
          icon: "error",
          title: "Thêm sản phẩm thất bại",
        }).then();
        handleClose();
      });
  };

  const setNewOptions = (options) => {
    setOptions(options);
  };

  const createVariants = (options, i, n) => {
    if (i < n) {
      let values = options[i].values;
      values.map((value, index) => {
        valuesForName.push(value);
        if (valuesForName.length === n) {
          variantsAll.push({
            id: null,
            code: null,
            productId: null,
            name: product.name + "-" + valuesForName.join("-"),
            image: imageUrl,
            wholesalePrice: product.wholesalePrice,
            salePrice: product.salePrice,
            importPrice: product.importPrice,
          });
        }
        createVariants(options, i + 1, n);
        valuesForName.pop();
      });
    }
  };

  const onOptionChange = () => {
    createVariants(options, 0, options.length);
    setVariants(variantsAll);
  };

  const onCategoriesSelect = (data) => {
    setSelectCategories(data);
  };

  useLayoutEffect(() => {
    let x = localStorage.getItem("product");
    let y = x ? JSON.parse(x) : initProduct;
    setProduct(y);
  }, [options]);

  useEffect(() => {
    getSuppliers().then((r) => {
      setSuppliers(r.data.reverse());
    });
    setVariants(props.variants);

    getCategories()
      .then((res) => {
        setCategories(res.data.reverse());
      })
      .catch((error) => {});
  }, []);

  // Component
  const ProductInfo = () => {
    return (
      <>
        <Mui.Paper sx={{ px: 5, py: 2, height: 565 }}>
          <h1>Thông tin chung</h1>
          <hr />
          {/* <SelectSupplier ></SelectSupplier> */}

          <Antd.Form.Item
            style={{ marginTop: 50 }}
            labelCol={{ span: 24 }}
            labelAlign="left"
            label="Tên sản phẩm"
            name="name"
            rules={[
              { required: true, message: "Tên sản phẩm không được để trống" },
            ]}
          >
            <Antd.Input size={"large"}></Antd.Input>
          </Antd.Form.Item>
          <Antd.Space size={[50, 3]}>
            <Antd.Form.Item
              labelCol={{ span: 24 }}
              label="Giá bán lẻ"
              name="salePrice"
              style={{ width: "100%" }}
              rules={[
                { required: true, message: "Giá bán lẻ Không được để trống" },
              ]}
            >
              <Antd.InputNumber
                size={"large"}
                min={0}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              ></Antd.InputNumber>
            </Antd.Form.Item>
            <Antd.Form.Item
              labelCol={{ span: 24 }}
              label="Giá bán buôn"
              name="wholesalePrice"
            >
              <Antd.InputNumber
                size={"large"}
                min={0}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              ></Antd.InputNumber>
            </Antd.Form.Item>
            <Antd.Form.Item
              labelCol={{ span: 24 }}
              label="Giá nhập"
              name="importPrice"
              rules={[
                { required: true, message: "Giá nhập không được để trống" },
              ]}
            >
              <Antd.InputNumber
                size={"large"}
                min={0}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              ></Antd.InputNumber>
            </Antd.Form.Item>
          </Antd.Space>
          <Antd.Form.Item name="description">
            <Antd.Input.TextArea rows={8} placeholder="Mô tả sản phẩm" />
          </Antd.Form.Item>
        </Mui.Paper>
      </>
    );
  };

  const ImageSelect = () => {
    return (
      <Mui.Paper sx={{ px: 5, py: 2, height: 250, mb: 2 }}>
        <h1>Thêm hình ảnh </h1>
        <div style={{ margin: "20px 20px" }}>
          <ImageUpload imageUrl={imageUrl} setUrl={onImageChange} />
        </div>
      </Mui.Paper>
    );
  };

  const Variants = () => {
    return (
      <>
        <h1>Các phiên bản</h1>
        <Mui.TableContainer
          component={Mui.Paper}
          sx={{ maxHeight: 500, overflow: "hiden" }}
        >
          <Mui.Table aria-label="simple table" stickyHeader>
            <Mui.TableHead>
              <Mui.TableRow>
                <Mui.TableCell align="center">Tên sản phẩm</Mui.TableCell>
                <Mui.TableCell align="center">Giá bán lẻ</Mui.TableCell>
                <Mui.TableCell align="center">Giá bán buôn</Mui.TableCell>
                <Mui.TableCell align="center">Giá nhập</Mui.TableCell>
              </Mui.TableRow>
            </Mui.TableHead>
            <Mui.TableBody>
              {variants.map((variant, index) => (
                <Mui.TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <Mui.TableCell component="th" scope="row" align="center">
                    {variant.name}
                  </Mui.TableCell>
                  <Mui.TableCell align="center">
                    <Antd.InputNumber
                      defaultValue={variant.salePrice}
                      size="middle"
                      style={{ width: "70%" }}
                      min={0}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      onChange={(e) => {
                        variant.salePrice = Number(e);
                      }}
                    />
                  </Mui.TableCell>
                  <Mui.TableCell align="center">
                    <Antd.InputNumber
                      defaultValue={variant.wholesalePrice}
                      size="middle"
                      style={{ width: "70%" }}
                      min={0}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      onChange={(e) => {
                        variant.wholesalePrice = Number(e);
                      }}
                    />
                  </Mui.TableCell>
                  <Mui.TableCell align="center">
                    <Antd.InputNumber
                      defaultValue={variant.importPrice}
                      size="middle"
                      style={{ width: "70%" }}
                      min={0}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      onChange={(e) => {
                        variant.importPrice = Number(e);
                      }}
                    />
                  </Mui.TableCell>
                </Mui.TableRow>
              ))}
            </Mui.TableBody>
          </Mui.Table>
        </Mui.TableContainer>
      </>
    );
  };

  return (
    <div className="p-5">
      <Antd.Spin spinning={open} tip={"Đang lưu..."}>
        <h2 style={{ fontSize: "15px", paddingBottom: 20 }}>
          <Link to="/warehouse/products">
            <LeftOutlined /> Danh sách sản phẩm
          </Link>
        </h2>
        <Antd.Form
          onFinish={onSubmit}
          initialValues={product}
          onValuesChange={(change, value) => {
            localStorage.setItem("product", JSON.stringify(value));
          }}
        >
          <Mui.Box sx={{ flexGrow: 1, mb: 5 }}>
            <Mui.Grid container spacing={2}>
              <Mui.Grid item xs={7} textAlign={"left"}>
                <ProductInfo></ProductInfo>
              </Mui.Grid>
              <Mui.Grid item xs={5}>
                <Mui.Grid container spacing={2}>
                  <Mui.Grid item xs={6}>
                    <ImageSelect />
                  </Mui.Grid>
                  <Mui.Grid item xs={6}>
                    <SelectCategory
                      selectCategories={selectCategories}
                      onChange={onCategoriesSelect}
                    />
                  </Mui.Grid>
                </Mui.Grid>
                {/* <OptionInfo></OptionInfo> */}
                <SelectOption
                  options={options}
                  onOptionChange={onOptionChange}
                  setOptions={setNewOptions}
                  size={4}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Box>

          {options[0]?.values.length > 0 ? <Variants /> : null}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Antd.Button
              type="primary"
              htmlType="submit"
              style={{ margin: "20px 0px", width: 150 }}
            >
              Lưu
            </Antd.Button>
          </div>
        </Antd.Form>
      </Antd.Spin>
    </div>
  );
}

export default AddProduct;
