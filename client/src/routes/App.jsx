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
import "../scss/home.scss";
import UserDetails from "../components/UserDetails/UserDetails";
import UserDashboard from "../components/UserDetails/components/UserDashboard";
import UserFavorites from "../components/UserDetails/components/UserFavorites";
import UserChangePassword from "../components/UserDetails/components/UserChangePassword";
import UserModifyInfo from "../components/UserDetails/components/UserModifyInfo";

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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/profile" element={<UserDetails />}>
          <Route path="info" element={<UserDashboard />} />
          <Route path="favorites" element={<UserFavorites />} />
          <Route path="changepw" element={<UserChangePassword />} />
          <Route path="modify_info" element={<UserModifyInfo />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <div className="containerK">
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
