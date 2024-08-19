import './PaginatedTable.scss';

function PaginatedTable({ ...props }) {
  const { currentPage, totalPages, onPageChange } = props;

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className='pagination'>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button key={index} onClick={() => onPageChange(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
          {index + 1}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default PaginatedTable;
