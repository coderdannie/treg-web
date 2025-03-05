import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  ReferenceLine,
} from 'recharts';

const data = [
  { name: 'Jan', value: 2 },
  { name: 'Feb', value: 3 },
  { name: 'Mar', value: 4.2 },
  { name: 'Apr', value: 3.8 },
  { name: 'May', value: 3.5 },
  { name: 'Jun', value: 5.7 },
  { name: 'Jul', value: 4.9 },
  { name: 'Aug', value: 5.1 },
  { name: 'Sept', value: 4.3 },
  { name: 'Oct', value: 4.7 },
  { name: 'Nov', value: 4.9 },
  { name: 'Dec', value: 5.0 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
        NGN {payload[0].value}m
      </div>
    );
  }
  return null;
};

const ChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} />

        {/* Shaded Area */}
        <Area
          type="monotone"
          dataKey="value"
          stroke="none"
          fill="rgba(0, 0, 255, 0.1)"
        />

        {/* Line Chart */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#1140e7"
          strokeWidth={2}
          dot={{ r: 4, fill: '#ffff', stroke: '#1140e7', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#1E40AF' }}
        />

        {/* Vertical Lines for Every Month */}
        {data.map((item) => (
          <ReferenceLine
            key={item.name}
            x={item.name}
            stroke="#E2E8F0"
            strokeDasharray="3 3"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
