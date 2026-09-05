import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  columns: string[];
  rows: unknown[][];
  chartType: string;
};

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

export default function ResultsChart({
  columns,
  rows,
  chartType,
}: Props) {
  if (
    columns.length < 2 ||
    rows.length === 0
  ) {
    return null;
  }

  const data = rows.map((row) => ({
    name: String(row[0]),
    value: Number(row[1]),
  }));

  const validData = data.filter(
    (item) => !Number.isNaN(item.value)
  );

  if (validData.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">

      <h2 className="text-2xl font-semibold mb-4">
        Chart
      </h2>

      <div className="h-96 w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          {chartType === "bar" ? (

            <BarChart data={validData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#64748b"
                opacity={0.3}
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#64748b",
                }}
              />

              <YAxis
                tick={{
                  fill: "#64748b",
                }}
              />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#06b6d4"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>

          ) : chartType === "pie" ? (

            <PieChart>

              <Tooltip />

              <Pie
                data={validData}
                dataKey="value"
                nameKey="name"
                outerRadius={130}
                label
              >
                {validData.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

            </PieChart>

          ) : chartType === "scatter" ? (

            <ScatterChart>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
                type="category"
              />

              <YAxis
                dataKey="value"
                type="number"
              />

              <Tooltip />

              <Scatter
                data={validData}
                fill="#06b6d4"
              />

            </ScatterChart>

          ) : chartType === "histogram" ? (

            <BarChart data={validData}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#8b5cf6"
              />
            </BarChart>

          ) : (

            <BarChart data={validData}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#10b981"
              />
            </BarChart>

          )}

        </ResponsiveContainer>

      </div>

    </div>
  );
}