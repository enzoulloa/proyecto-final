import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOwnerships } from "../../redux/actions";
import Cards from "../cards/Cards";
import Loading from "../Loading";
import NavBar from "../NavBar/NavBar";
import "../../scss/Listings.scss";

export default function Listing() {
  const dispatch = useDispatch();
  const ownerships = useSelector((state) => state.ownerships);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(GetOwnerships());
  }, [dispatch]);

  return (
    <div className="listings">
      <NavBar />
      <div className="cardsContainer">
        {loading ? <Loading /> : <Cards ownerships={ownerships} />}
      </div>
    </div>
  );
}
