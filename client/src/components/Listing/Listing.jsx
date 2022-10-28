import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOwnerships,  userFavorite, refresh} from "../../redux/actions";
import Cards from "../cards/Cards";
import Loading from "../Loading";
import NavBar from "../NavBar/NavBar";
import "../../scss/Listings.scss";
import FiltersCards from "../FilterCards";
import ReactPaginate from "react-paginate";
import Error from "../Error";

export default function Listing() {
  const dispatch = useDispatch();
  const ownerships = useSelector((state) => state.ownershipsFiltered);
  const userFavorites = useSelector((state)=>state.userFavorite)
  const loading = useSelector((state) => state.loading);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    if (ownerships.length === 0){
    dispatch(GetOwnerships());
    dispatch(userFavorite())
    }
  }, [dispatch]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(ownerships?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(ownerships?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, ownerships]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % ownerships.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="listings">
      <FiltersCards ownerships={ownerships} />
      <div className="cardsContainer">
        {loading ? (
          <Loading />
        ) : !ownerships.length ? (
          <Error />
        ) : (
          <div>
            <Cards ownerships={currentItems} />
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
            />
          </div>
        )}
      </div>
    </div>
  );
}
