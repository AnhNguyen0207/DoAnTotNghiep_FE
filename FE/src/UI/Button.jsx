import styled from "@emotion/styled";
import { Button } from "antd";
let red = "#d72503";
let blue = "#1890ff";
red = "#e74c3c";

const color = {
  cancel: red,
  delete: "rgb(246,76,114)",
};
const hover = {
  cancel: "#ff7875",
  delete: "rgb(246,76,114)",
};
const B = (props) => <Button {...props} />;

const Buttonn = styled(B)(
  {
    color: "#fff",
    borderColor: "#1890ff",
    background: blue,
    ":hover": {
      background: "#40a9ff",
      borderColor: "#40a9ff",
      color: "#fff",
    },
    ":active, :focus": {
      color: "#fff",
      borderColor: "#1890ff",
      background: "#1890ff",
    },
  },
  (props) => ({
    background: props?.mode && color[props?.mode],
    borderColor: props?.mode && color[props?.mode],
    ":hover": {
      background: props?.mode && hover[props?.mode],
      borderColor: props?.mode && hover[props?.mode],
      color: "#fff",
    },
    ":focus, :active": {
      background: props?.mode && color[props?.mode],
      borderColor: props?.mode && color[props?.mode],
      color: "#fff",
    },
  })
);

export default Buttonn;
