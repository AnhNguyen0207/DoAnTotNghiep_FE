import { Table, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";

const ImportStatisticNomal = (props) => {
  const { imports, onChange } = { ...props };
  const navigate = useNavigate();
  const normalImportCol = [
    {
      title: "STT",
      dataIndex: "importCode",
      key: "importCode",

      render: (importCode, record, index) => {
        return <p> {index + 1}</p>;
      },
    },
    {
      title: "Mã SP",
      dataIndex: "code",
      key: "code",

      render: (data, record) => {
        return (
          <Tag
            color="green"
            onClick={() => {
              navigate(
                `/warehouse/products/${record.productId}?backcode=statistic`
              );
            }}
          >
            <Link
              to={`/warehouse/products/${record.productId}?backcode=statistic`}
            >
              {data}
            </Link>
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
      align: "center",
      render: (data) => {
        return data > 0 ? data : "---";
      },
    },
    {
      title: "Trả lại",
      dataIndex: "returnNumber",
      key: "returnNumber",
      align: "center",
      render: (data) => {
        return data > 0 ? data : "---";
      },
    },

    {
      title: "Nhập kho",
      dataIndex: "receiveNumber",
      key: "receiveNumber",
      align: "center",
      render: (data) => {
        return data > 0 ? data : "---";
      },
    },
    {
      title: "Số tiền thanh toán",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => {
        return (
          <div>
            {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
          </div>
        );
      },
    },
  ];

  return (
    <Table
      style={{ height: 400 }}
      dataSource={imports}
      columns={normalImportCol}
      bordered
    ></Table>
  );
};
export default ImportStatisticNomal;
