import "../../scss/home.scss";
import FiltersHome from "../FiltersHome";
import Footer from "../Footer/Footer";
import HomeCards from "../HomeCards";
console.log(localStorage.getItem("UserLogin"));

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
