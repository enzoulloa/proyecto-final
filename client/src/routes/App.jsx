import About from "../components/About";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../components/detail/Detail.jsx";
import Home from "../components/Home/Home";
import Listing from "../components/Listing/Listing";
import NavBar from "../components/NavBar/NavBar";
import SellForm from "../components/SellForm";
import Footer from "../components/Footer/Footer";
import Login from "../components/Login/Login";
// import Alternative from "../components/Alternative";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/sell" element={<SellForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/listings" element={<Listing />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <div className="containerK">
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
