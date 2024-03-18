import {
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
  // BarChartOutlined,
  ImportOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { Menu } from "antd";
import LogoutIcon from "@mui/icons-material/Logout";
import "../styles/SideBar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

function getItem(label, key, icons, children) {
  return {
    key,
    icons,
    children,
    label,
  };
}

const MENUS = [
  getItem("Sản phẩm", "warehouse", <AppstoreOutlined />, [
    getItem("Thêm sản phẩm", "warehouse/products/add"),
    getItem("Danh sách sản phẩm", "warehouse/products"),
    getItem("Danh mục sản phẩm", "warehouse/categories"),
  ]),
  getItem("Hàng hoá", "coordinator", <DashboardIcon />, [
    getItem("Nhập hàng", "coordinator/purchase_orders", <ImportOutlined />),
    getItem("Chuyển hàng", "coordinator/storage", <ExportOutlined />),
  ]),
  getItem("Nhà cung cấp", "stocker/supplier", <ShopOutlined />),
  getItem("Kho hàng", "/stocker/inventories", <WarehouseIcon />),
  getItem("Admin", "admin", <TeamOutlined />, [
    getItem("Danh sách", "/admin/employees"),
    getItem("Chức vụ", "/admin/roles/"),
  ]),
  // getItem("Thống kê", "/statistics", <BarChartOutlined />),
  getItem("Đăng xuất", "/login", <LogoutIcon />),
];

const SideBar = () => {
  const userRoles = useSelector((state) => state?.user?.authorities);
  const items = MENUS.filter((m) => {
    return userRoles?.includes(m?.key?.toString() || "") && m;
  });
  items.push(getItem("Đăng xuất", "/login", <LogoutIcon />));

  const navigate = useNavigate();
  return (
    <>
      <div className="side-bar__brand-logo">
        <a href="/home">
          <img
            className="img-fill"
            src="https://bizweb.dktcdn.net/assets/admin/images/icon-svg/sub_logosapo-02.svg"
            alt="logo"
          />
        </a>
      </div>

      <div className="side-bar_menu">
        <Menu
          mode="inline"
          theme="dark"
          items={userRoles?.includes("admin") ? MENUS : items}
          onClick={(e) => {
            if (e.key.includes("login")) {
              localStorage.removeItem("token");
            }
            navigate(`${e.key}`, { replace: true });
          }}
        />
      </div>
    </>
  );
};

export default SideBar;
