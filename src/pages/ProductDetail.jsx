import { useDispatch } from "react-redux";
import { addToCart } from "../store/actions/cartActions";
import styles from "./styles/product.module.css";

export default function ProductDetail({ product }) {
    const dispatch = useDispatch();

    return (
        <div className={styles.productCardDetail}>
            <div className={styles.productTitle}>{product.name}</div>
            <div className={styles.productInfo}>{product.description}</div>
            <div className={styles.productPrice}>{product.price} ₽</div>
            <div className={styles.productInfo}>В наличии: {product.quantity}</div>

            <div className={styles.productActions}>
                <button
                    onClick={() => dispatch(addToCart(product, 1))}
                    disabled={product.quantity === 0}
                >
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
}
