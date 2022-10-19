import "../../scss/home.scss";
import FiltersHome from "../FiltersHome";
import Footer from "../Footer/Footer";
import HomeCards from "../HomeCards";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";

export default function Home() {

  const {isLoading} = useAuth0()

  return (
    <div className="home">
      <div className="containerI">
        <FiltersHome />
      </div>
      {
        isLoading?
        <Loading/>:
        <div>
        <HomeCards />
        </div>

      }
      
    </div>
  );
}
