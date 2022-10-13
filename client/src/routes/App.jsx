import About from "../components/About";
import "./App.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/about" component={About}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
