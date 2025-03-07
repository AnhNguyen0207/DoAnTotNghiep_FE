import { Tag } from "antd";
import Table from "antd/lib/table";
import { Link, useNavigate } from "react-router-dom";

const ImportStatisticExtend = (props) => {
  const { imports, onChange } = { ...props };
  const navigate = useNavigate();
  const extendImportCol = [
    {
      title: "STT",
      dataIndex: "importCode",
      key: "importCode",

      render: (importCode, record, index) => {
        return <p> {index + 1}</p>;
      },
    },
    {
      title: "Mã Phiếu nhập",
      dataIndex: "importCode",
      key: "importCode",
      width: "8%",

      render: (importCode, record) => {
        return (
          <Tag
            color="green"
            onClick={() => {
              navigate(
                `/coordinator/purchase_orders/details/${record.importCode}`
              );
            }}
          >
            <Link
              to={`/coordinator/purchase_orders/details/${record.importCode}`}
            >
              {importCode}
            </Link>
          </Tag>
        );
      },
    },
    {
      title: "Mã SP",
      dataIndex: "code",
      key: "code",

      render: (data, record) => {
        return (
          <Tag
            color="orange"
            onClick={() => {
              navigate(`/warehouse/products/${record.productId}`);
            }}
          >
            <Link to={`/warehouse/products/${record.productId}`}>{data}</Link>
          </Tag>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tổng Đặt",
      dataIndex: "importNumber",
      key: "importNumber",
      width: "7%",
      align: "center",
      render: (data) => {
        return data > 0 ? data : "---";
      },
    },
    {
      title: "Trả lại",
      dataIndex: "returnNumber",
      key: "returnNumber",
      width: "7%",
      align: "center",
      render: (data) => {
        return data > 0 ? data : "---";
      },
    },

    {
      title: "Nhập kho",
      dataIndex: "receiveNumber",
      key: "receiveNumber",
      width: "7%",
      align: "center",
      render: (data) => {
        return data > 0 ? data : "---";
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "importPrice",
      key: "importPrice",
      width: "12%",

      render: (importPrice) => {
        return importPrice ? (
          <div>
            {importPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
          </div>
        ) : (
          "---"
        );
      },
    },
    {
      title: "Số tiền thanh toán",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "12%",

      render: (totalPrice) => {
        return totalPrice ? (
          <div>
            {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
          </div>
        ) : (
          "---"
        );
      },
    },

    {
      title: "Ngày giao dự kiến",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      width: "12%",

      // render: (deliveryDate:string)=>
      //     {
      //     return (
      //         totalPrice?
      //         <div>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') } VNĐ</div>:0
      //     )
      // }
    },

    {
      title: "Thời điểm nhập",
      dataIndex: "createAt",
      key: "createAt",
      width: "12%",

      render: (data) => {
        const moment = require("moment");
        const d = new Date(data);
        return (
          <div>{moment(d, ["hh:mm A"]).format("DD-MM-YYYY HH:mm:ss")}</div>
        );
      },
    },
  ];

  return (
    <Table
      style={{ height: 400 }}
      dataSource={imports}
      columns={extendImportCol}
      bordered
      rowKey={"id"}
    ></Table>
  );
};
export default ImportStatisticExtend;
