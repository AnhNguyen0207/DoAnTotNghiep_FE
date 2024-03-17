import React from "react";
import { downloadExcel } from "react-export-table-to-excel";
import { Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const ExportExcelImportStatistic = (props) => {
  const { imports } = { ...props };
  const header = [
    "Mã SP",
    "Tên sản phẩm",
    "Tổng đặt",
    "Trả lại",
    "Nhập kho",
    "Số tiền thanh toán",
  ];
  const body = imports.map((item) => {
    return [
      item.code,
      item.name,
      item.importNumber,
      item.returnNumber,
      item.receiveNumber,
      item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    ];
  });

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Thống kê nhập sản phẩm ",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        body: body,
      },
    });
  }
  return (
    <Button
      style={{
        width: "150px",
        fontSize: "14px",
        marginRight: 20,
        marginLeft: 0,
      }}
      type="primary"
      onClick={handleDownloadExcel}
    >
      <Space>
        <DownOutlined />
        Xuất báo cáo
      </Space>
    </Button>
  );
};

export default ExportExcelImportStatistic;
