import About from "../components/About";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Error from "../components/Error"
import Loading from "../components/Loading"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/about" element={<About />} />
        <Route path="/nav" element={<NavBar />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/error" element={<Error />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
