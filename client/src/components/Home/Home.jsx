import NavBar from "../NavBar/NavBar";
import "../../scss/home.scss";
import Footer from "../Footer/Footer";
import FiltersHome from "../FiltersHome";
import HomeCards from "../HomeCards";

export default function Home() {
  return (
    <div className="home">
      <div className="containerI">
        <FiltersHome />
      </div>

      <div>
        <HomeCards />
      </div>
    </div>
  );
}
