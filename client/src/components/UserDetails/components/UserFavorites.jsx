import Cards from "../../cards/Cards";

export default function UserFavorites({ favorites }) {
  return (
    <div className="Favourites">
      <Cards ownerships={favorites} />
    </div>
  );
}
