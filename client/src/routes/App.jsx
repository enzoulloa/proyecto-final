import About from "../components/About";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SellForm from "../components/SellForm";
// import Alternative from "../components/Alternative";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/about" element={<About />} />
        <Route path="/nav" element={<NavBar />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/sell" element={<SellForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
