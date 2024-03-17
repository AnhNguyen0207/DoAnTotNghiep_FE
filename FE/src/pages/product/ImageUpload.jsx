import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { Delete } from "@mui/icons-material";
import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import * as Antd from "antd";

const ImageUpload = (props) => {
  const { imageUrl, setUrl } = { ...props };
  const handleCancel = () => setUrl(null);
  const [loading, setLoading] = useState(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const handleChange = (files) => {
    setLoading(true);
    console.log(files[0]);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "dorrjlrc");
    axios
      .post("http://api.cloudinary.com/v1_1/dbcjky0pz/image/upload", formData)
      .then((res) => {
        setUrl(res.data.secure_url);
        setLoading(false);
      });
  };

  const UploadBtn = () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px dotted black",
        display: "flex",
        padding: 50,
        justifyContent: "center",
      }}
    >
      {loading ? <Antd.Spin spinning={true}></Antd.Spin> : <PlusOutlined />}
    </div>
  );
  return (
    <>
      {imageUrl ? (
        <div style={{ width: "100%", height: "100%" }}>
          {/* <img alt="example" style={{ width: '100%', height: '100%' }} src={imageUrl} onClick={() => setPreviewVisible(true)} /> */}
          <Antd.Image
            width={"100%"}
            src={imageUrl}
            preview={{
              mask: (
                <>
                  <Button
                    type={"text"}
                    icon={<EyeOutlined style={{ color: "white" }} />}
                    onClick={() => setPreviewVisible(true)}
                  ></Button>
                  <Button
                    type={"text"}
                    icon={<Delete color="error" />}
                    onClick={handleCancel}
                  >
                    {" "}
                  </Button>
                </>
              ),
            }}
          />
        </div>
      ) : (
        <div style={{ width: "100%", height: "100%" }}>
          <label htmlFor="photo">
            <UploadBtn />
          </label>
          <input
            hidden
            id="photo"
            type={"file"}
            onChange={(e) => {
              handleChange(e.target.files);
            }}
          ></input>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
