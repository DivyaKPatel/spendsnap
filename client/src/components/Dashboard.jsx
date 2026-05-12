const Dashboard = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amountInCAD, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amountInCAD, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-green-50 rounded-xl shadow p-4 text-center">
        <p className="text-sm text-gray-500">Income</p>
        <p className="text-2xl font-bold text-green-600">${income.toFixed(2)} CAD</p>
      </div>
      <div className="bg-red-50 rounded-xl shadow p-4 text-center">
        <p className="text-sm text-gray-500">Expenses</p>
        <p className="text-2xl font-bold text-red-500">${expenses.toFixed(2)} CAD</p>
      </div>
      <div className="bg-blue-50 rounded-xl shadow p-4 text-center">
        <p className="text-sm text-gray-500">Balance</p>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
          ${balance.toFixed(2)} CAD
        </p>
      </div>
    </div>
  );
};

export default Dashboard;