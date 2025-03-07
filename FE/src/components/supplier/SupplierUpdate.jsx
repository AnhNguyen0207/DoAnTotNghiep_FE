import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { updateSupplier } from "../../api/api";
import ToastCustom from "../../constant/Toast";
import React, { useEffect, useState } from "react";

const SupplierUpdate = ({ supplier, isVisible, setIsVisible }) => {
  const { Option } = Select;
  const [formUpdate] = Form.useForm();
  const [visible, setVisible] = useState(isVisible);
  useEffect(() => {
    formUpdate.setFieldsValue({
      id: supplier.id,
      name: supplier.name,
      code: supplier.code,
      phone: supplier.phone,
      email: supplier.email,
      accountId: supplier.accountId,
      address: supplier.address,
      statusTransaction: supplier.statusTransaction + "",
    });
  }, [visible, supplier, formUpdate]);

  const onFormSubmit = (supplierForm) => {
    supplierForm.accountId = Number(1);
    supplierForm.id = supplier.id;
    updateSupplier(supplierForm)
      .then(() => {
        ToastCustom.fire({
          icon: "success",
          title: "Sửa nhà cung cấp thành công",
        }).then();
        window.location.reload();
      })
      .catch((err) => {
        const error = err.response.data.message;
        ToastCustom.fire({
          icon: "error",
          title: "Sửa nhà cung cấp thất bại",
          html: `${error}`,
        }).then();
      });
  };

  const handleCancel = () => {
    setVisible(false);
    setIsVisible();
    formUpdate.resetFields();
  };

  return (
    <>
      <Modal
        title="Sửa nhà cung cấp"
        open={visible}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
        forceRender
        footer={[]}
      >
        <div style={{ background: "white", padding: 24 }}>
          <Form form={formUpdate} onFinish={onFormSubmit} layout="vertical">
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Tên nhà cung cấp"
                  name="name"
                  rules={[
                    { required: true, message: "Tên không được để trống" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Mã nhà cung cấp " name="code">
                  <Input disabled placeholder="Nhập mã nhà cung cấp" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="SĐT"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "SĐT không được để trống",
                    },
                    {
                      pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                      message: "SĐT không hợp lệ!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập SĐT" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Email không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Trạng thái" name="statusTransaction">
                  <Select dropdownStyle={{ height: 100, width: 300 }}>
                    <Option style={{ width: 295 }} value="true">
                      Đang giao dịch
                    </Option>
                    <Option value="false">Ngừng giao dịch</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} style={{ height: "100%" }}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    { required: true, message: "Địa chỉ không được để trống" },
                  ]}
                >
                  <Input placeholder="nhập địa chỉ nhà cung cấp" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={4}>
                <Form.Item>
                  <Button onClick={handleCancel}>Huỷ</Button>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Xác nhận
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default SupplierUpdate;
