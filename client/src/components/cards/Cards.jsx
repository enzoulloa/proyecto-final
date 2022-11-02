import Card from "./Card";
import { useSelector } from "react-redux";
import "../../scss/Cards.scss";
import { useEffect } from "react";

export default function Cards({ ownerships }) {

  const statusModalLogin = useSelector((state)=>state.loginuserModal)
  const filter = useSelector((state)=>state.ownershipsFiltered)

useEffect(()=>{
  console.log('hola')
},[filter,ownerships])

  return (
    <div className="cardsGrid">
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
