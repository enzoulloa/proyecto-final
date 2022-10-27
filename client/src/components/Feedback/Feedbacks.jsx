import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../redux/actions.js";
import Feedback from "./Feedback.jsx";
import './Feedbacks.scss';

export default function Feedbacks({ownerID, reviews}) {
    const dispatch = useDispatch();
    //const reviews = useSelector(state => state.reviews)
    let [loading, setLoading] = useState(false)
    

    
    useEffect(() => {
        dispatch(getReview(ownerID))
    }, [dispatch])
    console.log(reviews)



    return (
        <div className="divContain">
            <h2>Comentarios: </h2>
            {
                reviews && reviews.map(review => {
                    return <Feedback review={review} />
                })
            }
        </div>
    )
}