import "../styles/Header.css";
import { Avatar, Tag } from "antd";
import { useSelector } from "react-redux";
import { ROLE_COLOR } from "../constant";

export default function HeaderMenu() {
  const currentUser = useSelector((state) => state.user);
  const title = useSelector((state) => state.title);

  return (
    <div className="top-header-menu flex justify-between h-full">
        <h2
            style={{
                fontSize: "20px",
                margin: 0,
            }}
            className="self-center"
        >
            {title}
        </h2>

      <div className="user-box">
        <Avatar size="large" src={`${currentUser?.image}`}>
          {currentUser?.username}
        </Avatar>
        <div>
          <div>{currentUser?.username}</div>
          <div>
            <Tag
              style={{
                scale: "0.75",
                transform: "translateX(-7px)",
              }}
              color={ROLE_COLOR[currentUser?.authorities[0]]}
            >
              {currentUser?.authorities[0]}
            </Tag>
          </div>
        </div>
      </div>
    </div>
  );
}
