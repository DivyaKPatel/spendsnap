import axios from 'axios';

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    onDelete(id);
  };

  const exportCSV = () => {
    const headers = ['Date,Description,Category,Type,Amount,Currency,Amount (CAD)'];
    const rows = transactions.map(t =>
      `${t.date},${t.description},${t.category},${t.type},${t.amount},${t.currency},${t.amountInCAD.toFixed(2)}`
    );
    const csv = [...headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spendsnap.csv';
    a.click();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-700">📋 Transactions</h2>
        <button onClick={exportCSV}
          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600">
          Export CSV
        </button>
      </div>
      {transactions.length === 0
        ? <p className="text-gray-400 text-center">No transactions yet!</p>
        : transactions.map(t => (
          <div key={t.id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-medium text-gray-700">{t.description}</p>
              <p className="text-xs text-gray-400">{t.category} · {t.date}</p>
            </div>
            <div className="text-right">
              <p className={`font-bold ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                {t.type === 'expense' ? '-' : '+'}${t.amountInCAD.toFixed(2)} CAD
              </p>
              <p className="text-xs text-gray-400">{t.amount} {t.currency}</p>
            </div>
            <button onClick={() => handleDelete(t.id)}
              className="ml-4 text-red-400 hover:text-red-600 text-sm">✕</button>
          </div>
        ))
      }
    </div>
  );
};

export default TransactionList;