import About from "../components/About";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Error from "../components/Error"
import Loading from "../components/Loading"
import FiltersCards from "../components/FilterCards"
import FiltersHome from "../components/FiltersHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/about" element={<About />} />
        <Route path="/nav" element={<NavBar />} />
        <Route path="/search" element={<FiltersHome />} />
        <Route path="/error" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/filterCards" element={<FiltersCards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
