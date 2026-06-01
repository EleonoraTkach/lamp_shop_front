import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/actions/reviewActions";
import styles from "../styles/product.module.css";

export default function AdminReviewItem({ review, productId }) {
    const dispatch = useDispatch();

    return (
        <div className={styles.reviewItem}>

            <p>{"⭐".repeat(review.score)}</p>
            <p>{review.description}</p>

            <button
                className={styles.deleteBtn}
                onClick={() => dispatch(deleteReview(productId, review.id))}
            >
                Удалить отзыв
            </button>

            <hr />
        </div>
    );
}
