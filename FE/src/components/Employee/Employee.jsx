import { useMutation } from "@tanstack/react-query";
import { Avatar, Form, Input, message, Modal, Space } from "antd";
import axios from "axios";
import Role from "./Role";
import RoleSelect from "./RoleSelect";
import { Button, DeletedIcon, Table, PenIcon } from "../../common_components";
import {
  accountApi,
  deleteEmpApi,
  updateEmployeeApi,
} from "../../api/employeesApi";
import { useState } from "react";
import useTitle from "../../constant/useTitle";
import Swal from "sweetalert2";
import ImageUpload from "../../common_components/ImageUpload";
import ToastCustom from "../../constant/Toast";

function Employee() {
  useTitle("Danh sách nhân viên", "Nhân viên");
  const [employeeId, setEmployeeId] = useState();
  const columns = [
    // {
    //   title: <b>ID</b>,
    //   dataIndex: "id",
    //   render: (text: string) => <div>{text}</div>,
    // },
    {
      title: <b>Ảnh</b>,
      dataIndex: "employee",
      render: (employees) => (
        <Avatar
          style={{ verticalAlign: "middle" }}
          src={employees && employees[0]?.image}
        >
          {(employees && employees[0]?.image) ||
            (employees && employees[0]?.fullName)}
        </Avatar>
      ),
    },
    {
      title: <b>Tài khoản</b>,
      dataIndex: "username",
      render: (text) => <div className="w-20">{text || "--"}</div>,
    },
    {
      title: <b>Họ & Tên</b>,
      dataIndex: "employee",
      render: (employees) => (
        <div>{(employees && employees[0]?.fullName) || "--.--"}</div>
      ),
    },
    {
      title: <b>SĐT</b>,
      dataIndex: "employee",
      render: (employees) => (
        <div>{(employees && employees[0]?.phone) || "--.--"}</div>
      ),
    },
    {
      title: <b>Email</b>,
      dataIndex: "employee",
      render: (employees) => (
        <div>{(employees && employees[0]?.email) || "--.--"}</div>
      ),
    },
    {
      title: <b>Địa chỉ</b>,
      dataIndex: "employee",
      render: (employees) => (
        <div style={{ width: "150px", textOverflow: "ellipsis" }}>
          {(employees && employees[0]?.address) || "--.--"}
        </div>
      ),
    },
    {
      title: <b>Chức vụ</b>,
      dataIndex: "roles",
      render: (roles, emp) => {
        return (
          <Role
            roles={roles?.sort()}
            empId={emp?.id}
            refetch={() => setReRender(!reRender)}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: ["id"],
      render: (id, record) => (
        <Space>
          <PenIcon
            onClick={() => {
              formUpdate(record);
              setIsModalUpdate(true);
            }}
          />
          <DeletedIcon onClick={() => deleteEmpHandle(id, record)} />
        </Space>
      ),
    },
  ];
  const [imageUrl, setImageUrl] = useState();

  let currentRoles = [];
  const setRole = (e) => {
    currentRoles = e;
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [employeeForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const postEmployee = useMutation(
    (newEmployee) => {
      return axios.post("http://localhost:8080/api/account", newEmployee, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
    },
    {
      onError: (error, variables, context) => {
        ToastCustom.fire({
          icon: "error",
          title: "Có lỗi xảy ra. Vui lòng thử lại",
        })
      },
      onSuccess: () => {
        ToastCustom.fire({
          icon: "success",
          title: "Thêm thành công",
        });
        setIsModalVisible(false);
      },
    }
  );
  const deleteEmpMutation = useMutation(deleteEmpApi, {
    onSuccess: () => {
      Swal.fire("Thành công!", "Đã thay đổi thành công", "success");
    },
    onError: () => {
      ToastCustom.fire({
        icon: "error",
        title: "Xảy ra lỗi. Vui lòng thử lại",
      })
    },
  });
  const addEmployeeHandle = () => {
    const { username, password, fullName, email, phone, address, roles } =
      employeeForm.getFieldsValue();

    postEmployee.mutate({
      username,
      password,
      fullName,
      email,
      phone,
      address,
      roleString: roles,
      image: imageUrl,
    });
  };

  const updateEmployeeHandle = () => {
    const { fullName, email, phone, address } = updateForm.getFieldsValue();
    const newEmployee = {
      id: employeeId,
      fullName,
      email,
      phone,
      address,
      image: imageUrl,
    };
    updateEmployeeApi(newEmployee)
      .then((res) => {
        if (res && res.status === 200) {
          ToastCustom.fire({
            icon: "success",
            title: "Cập nhật thành công",
          });
          setIsModalUpdate(false);
        }
      })
      .catch((error) => {
        ToastCustom.fire({
          icon: "error",
          title: "Có lỗi xảy ra. Vui lòng thử lại",
        })
      });
  };
  const deleteEmpHandle = (id, record) => {
    Swal.fire({
      icon: "question",
      title: "Thay đổi trạng thái",
      html: `Xác nhận xóa tài khoản <b>${record?.username || ""}</b>`,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#1890ff",
    }).then((e) => {
      if (e.isConfirmed) {
        deleteEmpMutation.mutate(id);
      }
    });
  };

  const onImageChange = (url) => {
    setImageUrl(url);
  };

  const formUpdate = (record) => {
    setEmployeeId(record.employee[0].id);
    updateForm.setFieldValue("fullName", record.employee[0].fullName);
    updateForm.setFieldValue("email", record.employee[0].email);
    updateForm.setFieldValue("phone", record.employee[0].phone);
    updateForm.setFieldValue("address", record.employee[0].address);
    setImageUrl(record.employee[0].image);
  };

  return (
    <div className="p-5">
      <div style={{ paddingBottom: 20 }}>
        <Button onClick={() => setIsModalVisible(true)}>Thêm nhân viên</Button>
      </div>

      <Table
        columns={columns}
        query={accountApi}
        rowKey={"id"}
        rowClassName="cursor-default"
        style={{ cursor: "default" }}
      />

      <Modal
        title={"Thêm nhân viên"}
        open={isModalVisible}
        // onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          employeeForm.resetFields();
        }}
        footer={null}
        closeIcon={<div></div>}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
          name="addEmployee"
          onFinish={addEmployeeHandle}
          className=""
          form={employeeForm}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Tên tài khoản không được để trống",
                pattern: /^[A-Za-z0-9_-]/,
              },
            ]}
            label="Tài khoản"
            name="username"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message:
                  "Mật khẩu tối thiểu 6 ký tự, ít nhất 1 chữ cái và 1 số, 1 ký tự đặc biệt",
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Họ tên không được để trống",
                pattern: /[A-Za-z0-9]/,
              },
            ]}
            label="Họ tên"
            name="fullName"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Không đúng định dạng email",
                pattern: new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="phone"
            rules={[
              {
                required: true,
                message: "Không đúng định dạng số điện thoại",
                pattern:
                  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Địa chỉ không được để trống",
                pattern: /[A-Za-z0-9]/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <RoleSelect getRole={setRole} />
          <div style={{ margin: "20px 20px 20px 115px" }}>
            <ImageUpload imageUrl={imageUrl} setUrl={onImageChange} />
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title={"Sửa thông tin nhân viên"}
        open={isModalUpdate}
        // onOk={handleOk}
        onCancel={() => {
          setIsModalUpdate(false);
          updateForm.resetFields();
        }}
        footer={null}
        closeIcon={<div></div>}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
          name="updateEmployee"
          onFinish={updateEmployeeHandle}
          className=""
          form={updateForm}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Họ tên không được để trống",
                pattern: /[A-Za-z0-9]/,
              },
            ]}
            label="Họ tên"
            name="fullName"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Không đúng định dạng email",
                pattern: new RegExp(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="phone"
            rules={[
              {
                required: true,
                message: "Không đúng định dạng số điện thoại",
                pattern:
                  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Địa chỉ không được để trống",
                pattern: /[A-Za-z0-9]/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div style={{ margin: "20px 20px 20px 115px" }}>
            <ImageUpload imageUrl={imageUrl} setUrl={onImageChange} />
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button type="primary" htmlType="submit">
              Sửa
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Employee;
