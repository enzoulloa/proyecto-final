import Card from "./Card";
import { useSelector } from "react-redux";
import "../../scss/Cards.scss";
import LoginModal from "../LoginModal/SignIn/LoginModal";

export default function Cards({ ownerships }) {

  const statusModalLogin = useSelector((state)=>state.loginuserModal)

  return (
    <div className="cardsGrid">
      {
        statusModalLogin && <LoginModal/>
      }
      {ownerships?.map((o) => (
        <Card
          key={o.id}
          images={o.images[0]}
          name={o.name}
          location={o.location}
          price={o.price}
          rooms={o.rooms}
          type={o.type}
          id={o.id}
        />
      ))}
    </div>
  );
}
