import { Col, Row } from "antd";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { X } from "@mui/icons-material";
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

let x = 0;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const PieChartReport = (props) => {
  return (
    <Row>
      <Col span={24} style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart {...props}>
            <Pie
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Col>
      <Col span={24}>
        {COLORS.map((c) => {
          x = x + 1;
          return (
            <div className="flex items-center gap-3" key={c}>
              <FiberManualRecordIcon style={{ color: c }} fontSize="small" />{" "}
              <span>Kho {x}</span>
            </div>
          );
        })}
      </Col>
    </Row>
  );
};

export default PieChartReport;
