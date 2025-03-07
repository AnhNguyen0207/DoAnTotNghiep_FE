import { useMutation } from "@tanstack/react-query";
import { Form, Image, Input, Typography } from "antd";
import axios from "axios";
import Button from "../common_components/Button";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useDispatch } from "react-redux";
import { setUserStore } from "../store/userSlice";
import useTitle from "../constant/useTitle";
import { useNavigate } from "react-router-dom";
import ToastCustom from "../constant/Toast";

const Login = () => {
  useTitle("", "Đăng nhập");
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();

  const loginSubmit = useMutation(
    async (loginData) => {
      return (await axios.post("http://localhost:8080/api/login", loginData))
        .data;
    },
    {
      onError: () => {
        ToastCustom.fire({
          icon: "error",
          title: "Tài khoản hoặc mật khẩu không đúng",
        });
      },
      onSuccess(data, variables, context) {
        dispatch(
          setUserStore({
            token: data.accessToken,
            accountId: data.accountId,
          })
        );
        ToastCustom.fire({
          icon: "success",
          title: "Đăng nhập thành công",
        });
        navigate("/home", { replace: true });
      },
    }
  );

  const onFinish = async (values) => {
    const { username, password } = loginForm.getFieldsValue();
    loginSubmit.mutate({ username, password });
  };

  return (
    <>
      <video
        className="videoTag fixed top-0 left-0 w-screen h-screen object-fill"
        autoPlay
        loop
        muted
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div
        className=" flex justify-center items-center h-screen w-screen gap-5 shadow-black"
        style={{ background: "#f0f8ff" }}
      >
        <Form
          className="flex gap-5 relative h-max w-max self-center bg-white rounded-3xl  shadow-md"
          form={loginForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 30 }}
          onFinish={onFinish}
          autoComplete="off"
          style={{ padding: "15px 35px" }}
        >
          <div className="self-center">
            <Image
              className="shadow-md rounded-xl"
              style={{ height: 265, width: 452, objectFit: "revert" }}
              preview={false}
              src="/bgi1.png"
            />
          </div>
          <div className="self-center">
            <Form.Item className="text-center">
              <Typography.Paragraph
                strong
                className="text-2xl"
                style={{ marginBottom: "0px" }}
              >
                Đăng Nhập
              </Typography.Paragraph>
            </Form.Item>

            <Form.Item
              name="username"
              rules={[{ required: true, message: "Hãy nhập tài khoản!" }]}
            >
              <Input
                className="pl-3"
                prefix={
                  <PersonIcon
                    style={{ color: "#1890ff", transform: "scale(0.75" }}
                  />
                }
                placeholder="Tài khoản"
                title="Nhập user name"
                style={{ borderRadius: "20px" }}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
            >
              <Input.Password
                className="pl-3"
                size="large"
                prefix={
                  <VpnKeyIcon
                    style={{ color: "#1890ff", transform: "scale(0.75" }}
                  />
                }
                placeholder="Mật khẩu"
                title="Nhập password"
                style={{ borderRadius: "20px" }}
                visibilityToggle={false}
              />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loginSubmit?.isLoading}
                type="primary"
                htmlType="submit"
                className="w-full m-0"
                style={{ borderRadius: "20px", margin: 0 }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
 