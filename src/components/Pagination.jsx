import React from 'react';

const checkMobileScroll = (currentViewWidth) => {
  if (currentViewWidth < 1065) window.scrollTo(0, 0);
};

const Pagination = ({
  cardsPerPage,
  totalCards,
  paginate,
  currentPage,
  setCurrentPage,
  currentViewWidth,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  const decreasePage = () => {
    setCurrentPage((prevPage) => (prevPage !== 1 ? prevPage - 1 : prevPage));
    checkMobileScroll(currentViewWidth);
  };
  const increasePage = () => {
    setCurrentPage((prevPage) => (prevPage !== pageNumbers.length ? prevPage + 1 : prevPage));
    checkMobileScroll(currentViewWidth);
  };
  const goPage = (page) => {
    setCurrentPage(page);
    checkMobileScroll(currentViewWidth);
  };

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button className="pagination__link" onClick={() => goPage(1)}>
            &lt;&lt;
          </button>
        </li>
        <li className="pagination__item">
          <button className="pagination__link" onClick={() => decreasePage()}>
            &lt;
          </button>
        </li>
        {currentPage > 4 && <li className="pagination__link pagination__link-dots">...</li>}
        {pageNumbers.map((number, index) => {
          return (
            index >= currentPage - 3 &&
            index <= currentPage + 1 && (
              <li
                key={number}
                className={number === currentPage ? 'pagination__item active' : 'pagination__item'}
              >
                <button
                  onClick={() => paginate(number)}
                  className={
                    number === currentPage ? 'pagination__link active' : 'pagination__link'
                  }
                >
                  {number}
                </button>
              </li>
            )
          );
        })}
        {currentPage < pageNumbers.length - 3 && (
          <li className="pagination__link pagination__link-dots">...</li>
        )}
        <li className="pagination__item">
          <button className="pagination__link" onClick={() => increasePage()}>
            &gt;
          </button>
        </li>
        <li className="pagination__item">
          <button className="pagination__link" onClick={() => goPage(pageNumbers.length)}>
            &gt;&gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export { Pagination, checkMobileScroll };
