import React from "react";
import './Paginated.scss'


export default function Paginated({ownershipsPerPage, allOwnerships, pagination,currentPage, next, previus}){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allOwnerships/ownershipsPerPage); i++) {
        pageNumbers.push(i);        
    }

    return(
        <nav className="nav-pagitated">
            <button onClick={(e)=>previus()}> {'<Anterior'} </button>
            <ul className="ul_list">
                {
                    pageNumbers?.map(number => (
                        <li key={number} className={currentPage === number?'select-page li_list' : 'li_list' }>
                            <a className={currentPage === number?'select-page a_list' : 'a_list' } onClick={() => pagination(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
            <button onClick={(e)=>next(pageNumbers.length)}> {'Siguiente>'} </button>
        </nav>
    )
};