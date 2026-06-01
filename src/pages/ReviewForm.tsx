import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../store/actions/reviewActions";
import styles from "./styles/product.module.css";

export default function ReviewForm({ productId }) {
    const dispatch = useDispatch();
    const [score, setScore] = useState(5);
    const [text, setText] = useState("");
    const [orderNumber, setOrderNumber] = useState("");

    const handleAddReview = () => {
        if (!text.trim() || !orderNumber.trim()) return;

        dispatch(
            createReview(productId, {
                order_number: orderNumber,
                score,
                description: text,
            })
        );

        setText("");
        setOrderNumber("");
        setScore(5);
    };

    return (
        <div className={styles.reviewForm}>
            <input
                type="text"
                placeholder="Номер заказа"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
            />

            <select value={score} onChange={(e) => setScore(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                ))}
            </select>

            <textarea
                placeholder="Ваш отзыв"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button onClick={handleAddReview}>Оставить отзыв</button>
        </div>
    );
}
