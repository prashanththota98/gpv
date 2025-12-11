import { Pie, Cell, PieChart, Tooltip, ResponsiveContainer } from "recharts";
import "./index.css";

const PieCharts = (props) => {
  const { pieData, className, legendPosition } = props;
  const formattedData = pieData.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  const COLORS = ["#54CA76", "#31A4E6", "#F5C452", "#F2637F", "#9261F3"];

  return (
    <div className={`piechart-wrapper ${legendPosition}`}>
      <div className={`pie-chart-container ${className}`}>
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            {/* <rect width="370" height="370" fill="aqua" /> */}
            <Pie
              data={formattedData}
              dataKey="value"
              nameKey="name"
              cx="50%" // center horizontally inside 370 width
              cy="50%" // center vertically inside 370 height
              innerRadius="60%"
              outerRadius="100%"
              fill="#8884d8"
              labelLine={false}
              stroke="#ffffff"
              strokeWidth={1.51}
            >
              {formattedData.map((entry) => (
                <Cell
                  key={entry.id || entry.name}
                  fill={COLORS[formattedData.indexOf(entry) % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Custom Legend container */}
      <div
        style={{
          width: "200px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          fontSize: "12px",
        }}
      >
        {formattedData.map((entry, index) => (
          <div
            key={entry.name}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: COLORS[index % COLORS.length],
              }}
            />
            <span style={{ color: "white" }}>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieCharts;

/* <div className={`pie-chart-container ${className}`}> */
