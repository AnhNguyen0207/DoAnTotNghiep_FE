import { Select, Form, Popconfirm } from "antd";
import React, { useState } from "react";
import { findProductById, getProducts } from "../../api/productVariant";
import "./file.css";
import { getAllInventory } from "../../api/inventory";
import { Radio, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { DeleteTwoTone } from "@ant-design/icons";

const Search = () => {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const data = products;

  const [inventorySend, setInventorySend] = useState();
  const [inventoryReceive, setInventoryReceive] = useState();

  // const [status, setStatus] = useState(true);
  const handleQuantity = (e) => {
    const quantity = e.target.value;
    const id = e.target.id * 1;

    setProducts((prev) => {
      prev.map((prod) => {
        if (prod.getProductById.data.id === id) {
          prod.quantity = quantity;
        }
      });
      return [...prev];
    });
  };
  const handleDelete = (e) => {
    // const id = e.target.id * 1;
    const newData = products.filter(
      (item) => item.getProductById.data.id !== e
    );
    setProducts(newData);
  };
  const columns = [
    {
      title: "Mã hàng",
      dataIndex: "getProductById",
      render: (text) => {
        return <div>{text?.data?.code}</div>;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "getProductById",
      render: (text) => {
        return <div>{text?.data?.name}</div>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: ["quantity", "getProductById"],
      render: (a, text) => {
        return (
          <input
            type={"number"}
            style={{ width: "50px" }}
            onChange={handleQuantity}
            id={text?.getProductById.data.id}
            key={text?.getProductById.data.id}
            value={text.quantity}
            min={"0"}
          ></input>
        );
      },
    },
    {
      dataIndex: ["getProductById"],
      render: (text) => {
        return (
          <Popconfirm
            id={text?.data.id}
            key={text?.data.id}
            // onClick={handleDelete}
            title="Sure to delete?"
            onConfirm={() => handleDelete(text?.data.id)}
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      },
    },
  ];

  useQuery(["ListProduct"], () => {
    const searchProduct = async () => {
      const getList = await getProducts();
      setProduct(getList.data);
    };
    searchProduct();
  });

  const handleClickOptionProduct = (e) => {
    const isFound = products.findIndex((element) => {
      if (element.getProductById.data.id === e) {
        return true;
      }
      return false;
    });

    const hanldeClick = async () => {
      const getProductById = await findProductById(e);

      const a = {
        getProductById,
        quantity: 1,
      };
      setProducts([a, ...products]);
    };
    if (isFound < 0) {
      hanldeClick();
    } else {
      setProducts((prev) => {
        // eslint-disable-next-line array-callback-return
        prev.map((prod) => {
          if (prod.getProductById.data.id === e) {
            prod.quantity = prod.quantity * 1 + 1;
          }
        });
        return [...prev];
      });
    }
  };
  /* ------------------ select inventory --------------- */

  const [inventories, setInventory] = useState([]);
  useQuery(["getListInventory"], () => {
    const getListInventories = async () => {
      const listInventory = await getAllInventory();
      setInventory(listInventory.data);
    };
    getListInventories();
  });
  const handleClickOptionSend = (e) => {
    setInventorySend(e);
  };
  const handleClickOptionReceive = (e) => {
    setInventoryReceive(e);
  };
  //--------------------- form -------------------

  // const handleSubmit = async () => {
  //   const saveExport = await createExport(exportValue);
  //   const exportId = saveExport.data.id;
  //   const detailExport = products.map((e: any) => {
  //     return {
  //       productVariant: e.getProductById.data.id,
  //       quantity: e.quantity,
  //       export: exportId,
  //     };
  //   });
  //   creatDetailExportSubmit.mutate(detailExport);
  // };

  return (
    <>
      <div className="content">
        <div className="content-top">
          <div className="select-inventory">
            <div className="title">
              <h3>Thông tin phiếu</h3>
            </div>
            <div className="select-inventory-left">
              <div className="select-inventory-top">
                <div className="title-p">
                  <p>Chi nhánh chuyển</p>
                </div>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  dropdownStyle={{ height: 150, width: 1000000 }}
                  placeholder="Tìm kiếm chi nhánh"
                  optionFilterProp="children"
                  onSelect={handleClickOptionSend}
                >
                  {inventories?.map((item) => (
                    <Select
                      style={{ width: "100%" }}
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </Select>
                  ))}
                </Select>
              </div>
              <div className="select-inventory-top">
                <div className="title-p">
                  <p>Chi nhánh nhận</p>
                </div>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  dropdownStyle={{ height: 150, width: 3000000 }}
                  placeholder="Tìm kiếm chi nhánh"
                  optionFilterProp="children"
                  onSelect={handleClickOptionReceive}
                >
                  {inventories.map((item) => (
                    <Select
                      style={{ width: "100%" }}
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </Select>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="additional-information">
            <div className="title">
              <h3>Thông tin bổ sung</h3>
            </div>
            <div>
              <p>Ghi chú</p>
              <textarea
                rows={3}
                style={{ width: "100%" }}
                placeholder={"VD : Giao hàng nhanh"}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="background-export">
          <div className="title">
            <h3>Thông tin sản phẩm</h3>
          </div>
          <Select
            showSearch
            style={{ width: "70%" }}
            dropdownStyle={{ width: 1000 }}
            placeholder="Tìm kiếm sản phẩm"
            optionFilterProp="children"
            onSelect={handleClickOptionProduct}
            value=""
          >
            {product.map((item) => (
              <Select style={{ width: "100%" }} key={item.id} value={item.id}>
                <div>
                  <div>{item.name}</div>
                  <div>Tồn : {item.salePrice} | Có thể bán : 10</div>
                </div>
              </Select>
            ))}
          </Select>

          <Radio.Group value={"checkbox"}></Radio.Group>

          <Table
            rowKey={"id"}
            columns={columns}
            dataSource={data}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        {/*<Button type="primary" htmlType="submit" onClick={handleSubmit}>*/}
        {/*  Submit*/}
        {/*</Button>*/}
      </Form.Item>
    </>
  );
};

export default Search;
