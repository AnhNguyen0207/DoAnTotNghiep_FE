import React, { useEffect, useState } from "react";
import { getDistrict, getProvince, getWard } from "../api/api";
import { Col, Form, Input, Row, Select } from "antd";

const AddAddress = ({ onChange, keyChange }) => {
  const { Option } = Select;
  const onChangeProvinces = (value) => {
    setProvinceCode(value);
    const item = provinces.find((p) => {
      return p.id.toString() === value;
    });
    item && setProvinceName(", " + item.name);
  };
  const onChangeDistrict = (value) => {
    setDistrictCode(value);
    const item = districts.find((d) => {
      return d.id.toString() === value;
    });
    item && setDistrictName(", " + item.name);
  };
  const onChangeWard = (value) => {
    const item = wards.find((w) => {
      return w.id.toString() === value;
    });
    item && setWardName(", " + item.name);
  };
  const [provinces, setProvinces] = useState([{}]);
  const [districts, setDistricts] = useState([{}]);
  const [wards, setWards] = useState([{}]);

  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  const [provinceCode, setProvinceCode] = useState();
  const [districtCode, setDistrictCode] = useState();
  const [detailAddress, setDetailAddress] = useState("");

  let address = detailAddress + wardName + districtName + provinceName;

  useEffect(() => {
    onChange(address);
  }, [address]);

  useEffect(() => {
    setDistricts([]);
    setWards([]);
    setDetailAddress("");
    setWardName("");
    setDistrictName("");
    setProvinceName("");
    address = "";
  }, [keyChange]);

  useEffect(() => {
    getProvince().then((p) => {
      setProvinces(p.data.data);
    });
  }, []);

  useEffect(() => {
    provinceCode &&
      getDistrict(provinceCode).then((d) => {
        setDistricts(d.data.data);
      });
  }, [provinceCode]);

  useEffect(() => {
    districtCode &&
      getWard(districtCode).then((w) => {
        setWards(w.data.data);
      });
  }, [districtCode]);

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label="Địa chỉ chi tiết"
            name="detailsAddress"
            rules={[{ required: true, message: "Địa chỉ không được để trống" }]}
          >
            <Input
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="Nhập địa chỉ nhà cung cấp"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Thành phố/Tỉnh"
            name="province"
            rules={[
              { required: true, message: "Thành phố không được để trống" },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn tỉnh thành phố"
              optionFilterProp="children"
              onChange={onChangeProvinces}
              // onSearch={onSearch}
              listItemHeight={1}
              listHeight={250}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              dropdownStyle={{ height: 250, width: 100 }}
            >
              {provinces &&
                provinces.map((p, key) => (
                  <Option
                    key={key}
                    style={{ height: 37, width: 290 }}
                    value={p.id}
                  >
                    {p.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Quận/Huyện"
            name="district"
            rules={[
              { required: true, message: "Quận huyện không được để trống" },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn quận huyện"
              optionFilterProp="children"
              onChange={onChangeDistrict}
              listItemHeight={1}
              listHeight={250}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              // dropdownStyle={{height: 250, width: 100}}
              dropdownMatchSelectWidth
            >
              {districts.length > 1 ? (
                districts.map((d, key) => (
                  <Option
                    key={key}
                    style={{ height: 37, width: 290 }}
                    value={d.id}
                  >
                    {d.name}
                  </Option>
                ))
              ) : (
                <Option style={{ width: 400 }} value="default">
                  Chọn quận huyện
                </Option>
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Phường/Xã"
            name="ward"
            rules={[
              { required: true, message: "Phường xã không được để trống" },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn xã phường"
              optionFilterProp="children"
              onChange={onChangeWard}
              listItemHeight={1}
              listHeight={250}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              dropdownStyle={{ height: 250, width: 100 }}
            >
              {wards.length > 1 ? (
                wards.map((w, key) => (
                  <Option
                    key={key}
                    style={{ height: 37, width: 290 }}
                    value={w.id}
                  >
                    {w.name}
                  </Option>
                ))
              ) : (
                <Option style={{ width: 400 }} value="default">
                  Chọn xã phường
                </Option>
              )}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default React.memo(AddAddress);
