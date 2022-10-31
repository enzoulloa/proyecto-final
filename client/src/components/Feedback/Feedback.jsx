import React from "react";
import { FaStar } from "react-icons/fa";
import "./Feedback.scss";

export default function Feedback({review}) {
    const array = Array(5).fill(0)
    const stars = parseInt(review.stars)

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
    }

    return (
        <div className="fedDiv">
            <img src={review.Users[0].photo} alt="photo" className="photo" />
            <div className="revInfo">
                <div className="nameDiv">
                    <h2>{review.Users[0].name}</h2>
                    <div>
                        {
                        array.map((_, index) => {
                            return <FaStar
                                key={index} 
                                color={stars>index? colors.orange : colors.grey}
                            />
                            })
                        }
                    </div>
                </div>
                <p>{review.message}</p>
            </div>
        </div>
    )
}