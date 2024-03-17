import * as Antd from "antd";

const StatisticTypeOptions = (props) => {
  const { title, initValue, data, onChange } = { ...props };

  return (
    <Antd.Form.Item label={title} labelCol={{ span: 6 }} labelAlign={"left"}>
      <Antd.Radio.Group
        defaultValue={initValue}
        buttonStyle="solid"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {data.map((item, index) => {
          return (
            <Antd.Radio.Button value={item.key}>{item.value}</Antd.Radio.Button>
          );
        })}
      </Antd.Radio.Group>
    </Antd.Form.Item>
  );
};
export default StatisticTypeOptions;
