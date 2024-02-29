import React from "react";
import "./Pagination.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  // Sayfalama mantığı
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Aktif sayfa numarasına bağlı olarak gösterilecek sayfa numaralarını belirleme
  const renderPages = pageNumbers.filter((page) => {
    if (
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 2 && page <= currentPage + 2)
    ) {
      return true;
    }
    if (currentPage === 1 && page <= 5) return true;
    if (currentPage === totalPages && page >= totalPages - 4) return true;
    return false;
  });

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      )}

      {renderPages.map((page, index) => (
        <button
          key={index}
          className={`page-item ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
