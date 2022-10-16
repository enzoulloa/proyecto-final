import About from "../components/About";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../components/detail/Detail.jsx";
import Home from "../components/Home/Home";
import Listing from "../components/Listing/Listing";
import NavBar from "../components/NavBar/NavBar";
import SellForm from "../components/SellForm";
// import Alternative from "../components/Alternative";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/sell" element={<SellForm/>} />
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listings" element={<Listing />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
