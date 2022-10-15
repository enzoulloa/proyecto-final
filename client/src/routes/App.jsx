import About from "../components/About";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Error from "../components/Error"
import Loading from "../components/Loading"
import Paginated from "../components/Paginate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/paginated" element={<Paginated />} />
        <Route path="/about" element={<About />} />
        <Route path="/nav" element={<NavBar />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/error" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
