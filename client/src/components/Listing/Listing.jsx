import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOwnerships, userFavorite, refresh } from "../../redux/actions";
import Cards from "../cards/Cards";
import Loading from "../Loading";
import "../../scss/Listings.scss";
import FiltersCards from "../FilterCards";
import ReactPaginate from "react-paginate";
import Error from "../Error";
import Paginated from "./Paginated/Paginated";

export default function Listing() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const ownerships = useSelector((state) => state.ownershipsFiltered);
  const loading = useSelector((state) => state.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const [ownershipsPerPage, setOwnershipsPerPage] = useState(9);
  const indexOfLastOwnerships = currentPage * ownershipsPerPage;
  const indexOfFirstOwnerships = indexOfLastOwnerships - ownershipsPerPage;

  const currentOwnerships = ownerships.slice(indexOfFirstOwnerships, indexOfLastOwnerships);

  const pagination = pageNumber => {
    setCurrentPage(pageNumber);
}

  useEffect(() => {
    if (ownerships.length === 0) {
      dispatch(GetOwnerships(`published=Publicada`));
      dispatch(userFavorite());
    }
    setCurrentPage(1)
  }, [dispatch, user, ownerships]);

  function handlerNext(pageNumbers){
    if(pageNumbers > currentPage){
      setCurrentPage(currentPage+1)
    }
  }
  function handlerPrevius(){
    if(currentPage > 1){
      setCurrentPage(currentPage-1)
    }
      
  }
 

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
            <Cards ownerships={currentOwnerships} />
            <div className="dis-cont-paginated">
            <Paginated 
              ownershipsPerPage={ownershipsPerPage}
              allOwnerships={ownerships.length}
              pagination={pagination}
              currentPage={currentPage}
              next={handlerNext}
              previus={handlerPrevius}
            />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
