import About from "../components/About";
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
import UserChangePassword from "../components/UserDetails/components/UserChangePassword";
import UserModifyInfo from "../components/UserDetails/components/UserModifyInfo";
import UserOwnerships from "../components/UserOwnerships";
import UserPendingList from "../components/UserDetails/components/UserPendingList";
import UserModerate from "../components/UserDetails/components/UserModerate";
import LoginModal from "../components/LoginModal/SignIn/LoginModal";
import UserFavorite from "../components/Favorite/UserFavorite";
import "antd/dist/antd.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/vender" element={<SellForm />} />
        <Route path="/sobre_nosotros" element={<About />} />
        <Route path="/listado" element={<Listing />} />
        <Route
          path="/propiedades/detalles/:id/:name/:prodPrice"
          element={<Detail />}
        />
        <Route path="/ingresar" element={<SignIn />} />
        <Route path="/registrarse" element={<SignUp />} />
        <Route path="/usuario/:name" element={<UserDetails />}>
          <Route path="informacion" element={<UserDashboard />} />
          <Route path="cambio_contraseña" element={<UserChangePassword />} />
          <Route path="modificar_info" element={<UserModifyInfo />} />
          <Route path="formularios_pendientes" element={<UserPendingList />} />
          <Route path="moderacion" element={<UserModerate />} />
          <Route path="propiedades" element={<UserOwnerships />} />
        </Route>
        <Route path="/modal" element={<LoginModal />} />
        <Route path="/favoritos" element={<UserFavorite />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <div className="containerK">
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
