import React from 'react';

const Pagination = ({ cardsPerPage, totalCards, paginate, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  const decreasePage = () =>
    setCurrentPage((prevPage) => (prevPage !== 1 ? prevPage - 1 : prevPage));
  const increasePage = () =>
    setCurrentPage((prevPage) => (prevPage !== pageNumbers.length ? prevPage + 1 : prevPage));

  return (
    <nav>
      <ul className="pagination">
        <li className="pagination__item">
          <button className="pagination__link" onClick={() => decreasePage()}>
            &lt;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number === currentPage ? 'pagination__item active' : 'pagination__item'}
          >
            <button onClick={() => paginate(number)} className="pagination__link">
              {number}
            </button>
          </li>
        ))}
        <li className="pagination__item">
          <button className="pagination__link" onClick={() => increasePage()}>
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
