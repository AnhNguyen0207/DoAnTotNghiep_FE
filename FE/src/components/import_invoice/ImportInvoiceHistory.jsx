import React, { useState } from "react";
// import {getHistoryStatusImportInvoice} from "../../services/api";
import { Button, Modal, Table } from "antd";
import { columnsHistoryStatus } from "../../common_components/Datatablesource";

const ImportInvoiceHistory = ({ data, reload }) => {
  const [visible, setVisible] = useState(false);
  // const [tableData,setTableData] = useState<IHistoryStatus[]>([])
  // useEffect(() =>{
  //     getHistoryStatusImportInvoice(importId).then((result) =>{
  //         setTableData(result.data)
  //     })
  // },[reload])
  return (
    <div>
      <Button
        style={{ padding: 0 }}
        onClick={() => setVisible(true)}
        type="text"
      >
        <b style={{ color: "#1890ff" }}>Lịch sử thao tác đơn nhập hàng</b>
      </Button>
      {visible && (
        <Modal
          title="Lịch sử thao tác đơn nhập hàng"
          centered
          open={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
          footer={false}
          key="yooo"
        >
          <Table
            rowKey={"statusName"}
            columns={columnsHistoryStatus}
            dataSource={data}
            pagination={false}
          />
        </Modal>
      )}
    </div>
  );
};
export default ImportInvoiceHistory;
