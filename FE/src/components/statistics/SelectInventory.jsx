import * as Antd from "antd";
import React, { useEffect, useState } from "react";
import { getAllInventory } from "../../api/inventory";

const all = [
  {
    id: -1,
    code: "Tất cả",
    name: "",
    address: "",
    createAt: "",
    updateAt: "",
    isDelete: false,
  },
];
const SelectInventory = (props) => {
  const { initValue, onChange, spanLable } = { ...props };
  const [inventories, setInventories] = useState([]);
  useEffect(() => {
    getAllInventory().then((r) => {
      setInventories(all.concat(r.reverse()));
    });
  }, []);
  const handleSelect = (key) => {
    onChange(key);
  };
  return (
    <Antd.Form.Item
      label="Kho:"
      name={"inventoryId"}
      labelCol={{ span: spanLable }}
      labelAlign="left"
    >
      <Antd.Select
        style={{ width: "100%", marginBottom: 10, borderRadius: 5 }}
        size={"large"}
        showSearch
        placeholder="Nhấn để chọn nhà cung cấp"
        optionFilterProp="children"
        defaultValue={initValue}
        onChange={handleSelect}
        filterOption={(input, option) => option.children.includes(input)}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        {
          <>
            {inventories.map((inventory, index) => {
              return (
                <Antd.Select.Option key={inventory.id} value={inventory.id}>
                  {inventory.code + " | " + inventory.name}
                </Antd.Select.Option>
              );
            })}
          </>
        }
      </Antd.Select>
    </Antd.Form.Item>
  );
};
export default SelectInventory;
