import "./styles/Pagination.css";

const Pagination = ({ page, setPage, totalPages }) => {
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const pageNumbers = [];
  const delta = 2;

  for (
    let i = Math.max(2, page - delta);
    i <= Math.min(totalPages - 1, page + delta);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(1)} disabled={page === 1}>
        Inicio
      </button>
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      {page > 3 && <button onClick={() => handlePageChange(1)}>1</button>}
      {page > 4 && <span className="ellipsis">...</span>}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={pageNumber === page ? "active" : ""}
        >
          {pageNumber}
        </button>
      ))}
      {page < totalPages - 3 && <span className="ellipsis">...</span>}
      {page < totalPages - 2 && (
        <button onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      )}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Siguiente
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={page === totalPages}
      >
        Final
      </button>
    </div>
  );
};

export default Pagination;
