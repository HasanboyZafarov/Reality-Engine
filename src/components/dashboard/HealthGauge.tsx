import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

type Props = {
  score: number;
};

export default function HealthGauge({ score }: Props) {
  const data = [{ name: "health", value: score }];

  let color = "#22c55e"; // green
  if (score < 70) color = "#f59e0b"; // yellow
  if (score < 50) color = "#ef4444"; // red

  return (
    <div className="flex flex-col items-center">
      <RadialBarChart
        width={180}
        height={180}
        innerRadius="70%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          dataKey="value"
          cornerRadius={10}
          fill={color}
          background
        />
      </RadialBarChart>

      <div className="text-xl font-semibold mt-2">
        {score}%
      </div>

      <div className="text-sm text-gray-400">
        Health Score
      </div>
    </div>
  );
}