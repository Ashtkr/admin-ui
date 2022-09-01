import React, { useState } from "react";
import "./Paginate.css";

const Paginate = ({ userPerPage, totalUser, handlePageNumber }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const pageNumber = [];

  for (let pageStart = 1; pageStart <= Math.ceil(totalUser / userPerPage); pageStart++) {
    pageNumber.push(pageStart);
  }

  return (
    <div>
      <ul style={{ textDecoration: "none" }}>
        <div className="pagination">
            <div
              className="style-pagination"
              onClick={() => {
                handlePageNumber(1);
                setCurrentPageNumber(1);
              }}
            >
              {"<<"}
            </div>
            <div
              className="style-pagination"
              onClick={() => {
                if ((currentPageNumber - 1 )> 0) {
                  handlePageNumber(currentPageNumber - 1);
                  setCurrentPageNumber(currentPageNumber - 1);
                }
              }}
            >
              {"<"}
            </div>
            {pageNumber.map((number) => (
              <div
                key={number}
                className={
                  currentPageNumber === number
                    ? "style-pagination-selected"
                    : "style-pagination mobileView"
                }
                onClick={() => {
                  handlePageNumber(number);
                  setCurrentPageNumber(number);
                }}
              >
                {number}
              </div>
            ))}
            <div
              className="style-pagination"
              onClick={() => {
                if ((currentPageNumber + 1) <= pageNumber.length) {
                  handlePageNumber(currentPageNumber + 1);
                  setCurrentPageNumber(currentPageNumber + 1);
                }
              }}
            >
              {">"}
            </div>
            <div
              className="style-pagination"
              onClick={() => {
                handlePageNumber(pageNumber[pageNumber.length - 1]);
                setCurrentPageNumber(pageNumber[pageNumber.length - 1]);
              }}
            >
              {">>"}
            </div>
        </div>
      </ul>
    </div>
  );
};

export default Paginate;
