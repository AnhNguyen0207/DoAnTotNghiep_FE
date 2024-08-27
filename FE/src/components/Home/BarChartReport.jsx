import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Kho 1",
    nhập: 4000,
    xuất: 2400,
    amt: 2400,
  },
  {
    name: "Kho 2",
    nhập: 3000,
    xuất: 1398,
    amt: 2210,
  },
  {
    name: "Kho 3",
    nhập: 2000,
    xuất: 9800,
    amt: 2290,
  },
  {
    name: "Kho 4",
    nhập: 2780,
    xuất: 3908,
    amt: 2000,
  },
];

const BarChartReprot = (props) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        {...props}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="nhập" stackId="a" fill="#8884d8" />
        <Bar dataKey="xuất" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartReprot;
