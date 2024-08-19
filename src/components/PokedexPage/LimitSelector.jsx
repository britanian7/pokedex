const LimitSelector = ({ limit, setLimit }) => {
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
  };

  return (
    <div className="limit-selector">
      <label htmlFor="limit"></label>
      <select id="limit" value={limit} onChange={handleLimitChange}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default LimitSelector;
