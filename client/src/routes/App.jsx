import About from "../components/About";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../components/detail/Detail.jsx";
import Home from "../components/Home/Home";
import Listing from "../components/Listing/Listing";
import NavBar from "../components/NavBar/NavBar";
import SellForm from "../components/SellForm";
import Footer from "../components/Footer/Footer";
import SignUp from "../components/Login/SignUp/SignUp";
import SignIn from "../components/Login/SignIn/SignIn";
import Error from "../components/Error";
// import Alternative from "../components/Alternative";
import "../scss/home.scss";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/sell" element={<SellForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/listings" element={<Listing />} />
        <Route path="/ownerships/detail/:id/:name/:prodPrice" element={<Detail />} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/user/detail" />
        <Route path="*" element={<Error/>}/>
      </Routes>
      <div className="containerK">
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
