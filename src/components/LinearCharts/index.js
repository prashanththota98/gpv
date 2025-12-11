import "./index.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LinearChart({ quarterCommitCount }) {
  const data = quarterCommitCount;
  return (
    <div className="linearChartContainer">
      <div className="chartWrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            style={{ backgroundColor: "#132240" }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#3B82F6"
            />
            <XAxis dataKey="name" stroke="#3B82F6" />
            <YAxis stroke="#3B82F6" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="commits"
              stroke="#3B82F6"
              activeDot={{ r: 8, stroke: "#3B82F6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Title below the chart */}
      <span
        style={{
          display: "block",
          color: "#3B82F6",
          fontSize: "18px",
          fontWeight: "bold",
          marginTop: "5px",
          textAlign: "center", // Add some space between chart and title
        }}
      >
        Commits Per Quarter
      </span>
    </div>
  );
}
