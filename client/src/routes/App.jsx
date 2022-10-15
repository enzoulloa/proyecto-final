import About from "../components/About";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Listing from "../components/Listing/Listing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listings" element={<Listing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
