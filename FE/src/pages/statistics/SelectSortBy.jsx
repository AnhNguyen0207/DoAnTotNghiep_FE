import { Select } from "antd";

const SelectSortby = (props) => {
  const { initValue, sortOptions, onChange } = { ...props };
  return (
    <>
      <Select
        onChange={(value, option) => onChange(value)}
        defaultValue={initValue}
      >
        {sortOptions.map((item, index) => {
          return (
            <Select.Option key={item.key} value={item.key}>
              {item.value}
            </Select.Option>
          );
        })}
      </Select>
    </>
  );
};
export default SelectSortby;
