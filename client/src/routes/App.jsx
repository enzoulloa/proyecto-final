import About from "../components/About";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Error from "../components/Error"
import Loading from "../components/Loading"
import FiltersCards from "../components/FilterCards"
import FiltersHome from "../components/FiltersHome";
import Paginated from "../components/Paginate";
import Home from "../components/Home/Home";
import Listing from "../components/Listing/Listing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/paginated" element={<Paginated />} />
        <Route path="/nav" element={<NavBar />} />
        <Route path="/search" element={<FiltersHome />} />
        <Route path="/error" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/filterCards" element={<FiltersCards />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listings" element={<Listing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
