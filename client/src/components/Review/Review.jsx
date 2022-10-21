import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./review.scss";
import {postReview} from "../../redux/actions.js";

export default function Review() {
    const dispatch = useDispatch()
    const [review, setReview] = useState("")
    
    const handleChange = (e) => {
        e.preventDefault()
        setReview({[e.target.name]: e.target.value})
        console.log(review)
    }

    const sendReview = (e) => {
        e.preventDefault()
        dispatch(()=>postReview())
    }

    return (
        <div className="div-detail">         
                <strong className="strong-review">Deja tu comentario!</strong>
            <div>
                <textarea
                    name="review"
                    className="textarea-review"
                    onChange={handleChange}
                    value={review.review}
                    placeholder="Escribe...">
                </textarea>
            </div>
            <div>
                <button onClick={sendReview}>Enviar comentario</button>
            </div>
        </div>
    )
}
