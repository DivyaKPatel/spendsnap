import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#3b82f6','#ef4444','#10b981','#f59e0b','#8b5cf6','#ec4899','#14b8a6','#f97316'];

const SpendingChart = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense');

  const data = expenses.reduce((acc, t) => {
    const existing = acc.find(d => d.name === t.category);
    if (existing) existing.value += t.amountInCAD;
    else acc.push({ name: t.category, value: parseFloat(t.amountInCAD.toFixed(2)) });
    return acc;
  }, []);

  if (data.length === 0) return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 text-center text-gray-400">
      Add expenses to see your spending chart 📊
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-700 mb-4">📊 Spending by Category</h2>
      <PieChart width={380} height={250}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(val) => `$${val.toFixed(2)} CAD`} />
        <Legend />
      </PieChart>
    </div>
  );
};

export default SpendingChart;