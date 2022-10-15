import NavBar from "../NavBar/NavBar";
import "../../scss/home.scss";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <div className="home">
      <NavBar />
      <div className="containerI">
        <SearchBar />
      </div>
      <div className="containerK">
        <Footer />
      </div>
    </div>
  );
}
