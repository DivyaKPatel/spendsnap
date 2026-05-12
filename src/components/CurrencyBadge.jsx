const CurrencyBadge = ({ rates }) => {
  const currencies = ['USD', 'EUR', 'INR', 'GBP'];

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h2 className="text-sm font-semibold text-gray-500 mb-2">
        Live Rates (based in CAD)
      </h2>
      <div className="flex gap-4 flex-wrap">
        {currencies.map(cur => (
          <div key={cur} className="bg-blue-50 rounded-lg px-3 py-2 text-center">
            <p className="text-xs text-gray-400">{cur}</p>
            <p className="text-sm font-bold text-blue-600">
              {rates[cur] ? (1 / rates[cur]).toFixed(4) : '...'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyBadge;