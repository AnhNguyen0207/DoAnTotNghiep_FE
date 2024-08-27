import {
  LineChart,
  Line,
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

const LineChartReport = (props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        {...props}
        data={data}
        style={{ width: "100%" }}
        margin={{
          top: 5,
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
        <Line
          type="monotone"
          dataKey="nhập"
          stroke="#8884d8"
          activeDot={{ r: 5 }}
        />
        <Line type="monotone" dataKey="xuất" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartReport;
