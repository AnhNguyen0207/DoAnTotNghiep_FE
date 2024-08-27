import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PageResult from "./PageResult";

const Authen = () => {
  const { pathname } = useLocation();
  const userRoles = useSelector((state) => state?.user?.authorities);
  const auth = userRoles?.some((r) => pathname?.includes(r));

  if (userRoles?.includes("admin") || userRoles?.includes("staff") || pathname?.includes("home") || auth) {
    return <Outlet />;
  } else {
    return <PageResult />
  }
};

export default Authen;
