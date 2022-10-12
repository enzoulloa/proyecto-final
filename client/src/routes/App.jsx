import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>{/* <Route path="/nav" element={<NavBar />} /> */}</Routes>
    </BrowserRouter>
  );
}

export default App;
