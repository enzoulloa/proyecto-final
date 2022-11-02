import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./paginate.css";

export default function Paginated() {
  const [ownership, setOwnership] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("https://proyecto-final.up.railway.app/ownerships")
      .then((ownerships) => {
        setOwnership(ownerships.data);
      });
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(ownership.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(ownership.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, ownership]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % ownership.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div>
        {currentItems.map((e) => {
          return <h1>{e.name}</h1>;
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeClassName="active"
        initialPage={0}
      />
    </div>
  );
}
