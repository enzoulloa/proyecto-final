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
import PaymentStatus from "../components/PaymentStatus";
import UserPendingList from "../components/UserDetails/components/UserPendingList";
import UserModerate from "../components/UserDetails/components/UserModerate";
import LoginModal from "../components/LoginModal/SignIn/LoginModal";
import UserFavorite from "../components/Favorite/UserFavorite";

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
        <Route path='/estado_de_pago' element={<PaymentStatus />}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/:name" element={<UserDetails />}>
          <Route path="info" element={<UserDashboard />} />
          <Route path="cambio_contraseña" element={<UserChangePassword />} />
          <Route path="modificar_info" element={<UserModifyInfo />} />
          <Route path="formularios_pendientes" element={<UserPendingList />} />
          <Route path="moderacion" element={<UserModerate />} />
        </Route>
        <Route path='/modal' element={<LoginModal/>}/>
        <Route path="/favorite" element={<UserFavorite/>}/>
        <Route path="*" element={<Error />} />
      </Routes>
      <div className="containerK">
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
