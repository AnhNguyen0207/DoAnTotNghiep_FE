import * as Mui from "@mui/material";
import * as Antd from "antd";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/apiCategory";

const SelectCategory = (props) => {
  const { selectCategories, onChange } = { ...props };
  const initValues = selectCategories?.map((item, index) => item.name);

  const [categories, setCategories] = useState();
  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data.reverse());
      })
      .catch((error) => {});
  }, []);
  return (
    <>
      <Mui.Paper sx={{ px: 5, py: 2, height: 250, mb: 2 }}>
        <h1>Chọn Danh mục </h1>
        <Antd.Select
          style={{
            width: "100%",
            maxLines: 3,
            marginTop: "40px",
            marginBottom: 10,
            borderRadius: 5,
          }}
          size={"large"}
          showSearch
          mode="tags"
          placeholder="Nhấn để chọn "
          optionFilterProp="children"
          defaultValue={initValues}
          onChange={(value, options) => {
            let sCat = options.map((option, index) => {
              if (categories) return categories.at(option.key);
            });

            onChange(sCat);
          }}
        >
          {categories?.map((category, index) => {
            return (
              <Antd.Select.Option key={index} value={category.name}>
                {category.name}
              </Antd.Select.Option>
            );
          })}
        </Antd.Select>
      </Mui.Paper>
    </>
  );
};
export default SelectCategory;
