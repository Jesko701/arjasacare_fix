import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onChangePage,
}) => {
  console.log(currentPage, totalPages, itemsPerPage);
  let part = Math.ceil(currentPage / itemsPerPage);

  const start = itemsPerPage * part - (itemsPerPage - 1);
  let end = start + itemsPerPage - 1;

  if (end > totalPages) end = totalPages;

  const displayed = [];

  if (end == 1)
    displayed.push(
      <li className="page-item active" key={0}>
        <a href={`/produk/?page=1`} className="page-link">
          1
        </a>
      </li>
    );
  else {
    displayed.push(
      <li className="page-item prev" key={0}>
        <a
          className="page-link btn"
          onClick={() =>
            onChangePage(currentPage - 1 > 0 ? currentPage - 1 : 1)
          }
        >
          <i className="tf-icon bx bx-chevron-left"></i>
        </a>
      </li>
    );
    for (let i = start; i <= end; i++) {
      displayed.push(
        <li className={`page-item ${i == currentPage ? "active" : ""}`} key={i}>
          <a className="page-link btn" onClick={() => onChangePage(i)}>
            {i}
          </a>
        </li>
      );
    }
    displayed.push(
      <li className="page-item next" key={end + 1}>
        <a
          className="page-link btn"
          onClick={() =>
            onChangePage(
              currentPage + 1 <= totalPages ? currentPage + 1 : totalPages
            )
          }
        >
          <i className="tf-icon bx bx-chevron-right"></i>
        </a>
      </li>
    );
  }

  return (
    <>
      <div className="card mb-4" id="produk-pagination">
        <div className="demo-inline-spacing" id="pagination">
          <nav aria-label="Page navigation">
            <ul className="pagination">{displayed}</ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Pagination;
