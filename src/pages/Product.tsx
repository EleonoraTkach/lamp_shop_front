import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/actions/cartActions";

import {
    loadReviews,
    createReview,
} from "../store/actions/reviewActions";

import { loadProductsById } from "../store/actions/productActions";

import styles from "./styles/product.module.css";

export default function Product() {
    const dispatch = useDispatch();
    const { id } = useParams();

    // PRODUCT STATE
    const product = useSelector(
        (state) => state.products.selectedProduct
    );

    const productLoading = useSelector(
        (state) => state.products.loading
    );

    const productError = useSelector(
        (state) => state.products.error
    );

    // REVIEWS STATE
    const reviews = useSelector(
        (state) => state.reviews.reviews
    );

    const reviewsLoading = useSelector(
        (state) => state.reviews.loading
    );

    const reviewsError = useSelector(
        (state) => state.reviews.error
    );

    // LOAD PRODUCT
    useEffect(() => {
        if (id) {
            dispatch(loadProductsById(id));
            dispatch(loadReviews(id));
        }
    }, [id, dispatch]);

    // FORM STATE
    const [score, setScore] = useState(5);
    const [text, setText] = useState("");
    const [orderNumber, setOrderNumber] = useState("");

    const handleAddReview = () => {
        if (!text.trim() || !orderNumber.trim()) return;

        dispatch(
            createReview(id, {
                order_number: orderNumber,
                score,
                description: text,
            })
        );

        setText("");
        setOrderNumber("");
        setScore(5);
    };

    const safeReviews = Array.isArray(reviews) ? reviews : [];

    const avg = safeReviews.length
        ? safeReviews.reduce(
        (s, r) => s + Number(r.score || 0),
        0
    ) / safeReviews.length
        : 0;

    if (!product) return <p>Товар не найден</p>;


    return (
        <div className={styles.productPage}>
            <button
                className={styles.productBack}
                onClick={() => window.history.back()}
            >
                ← Назад
            </button>

            {productLoading && (
                <p>Загрузка товара...</p>
            )}

            {productError && (
                <div className={styles.errorBox}>
                    <p className={styles.errorTitle}>⚠ Ошибка товара</p>
                    <p className={styles.errorMessage}>{productError}</p>
                </div>
            )}

            {/* PRODUCT */}
            <div className={styles.productCardDetail}>
                <div className={styles.productTitle}>
                    {product.name}
                </div>

                <div className={styles.productInfo}>
                    {product.description}
                </div>

                <div className={styles.productPrice}>
                    {product.price} ₽
                </div>

                <div className={styles.productInfo}>
                    В наличии: {product.quantity}
                </div>

                <div className={styles.productActions}>
                    <button
                        onClick={() =>
                            dispatch(addToCart(product, 1))
                        }
                        disabled={product.quantity === 0}
                    >
                        Добавить в корзину
                    </button>
                </div>
            </div>

            {/* REVIEWS */}
            <h2>Рейтинг: {avg.toFixed(1)} ⭐</h2>

            <h2>Отзывы</h2>

            {reviewsLoading && <p>Загрузка отзывов...</p>}

            {reviewsError && (
                <div className={styles.errorBox}>
                    <p>⚠ Ошибка отзывов</p>
                    <p>{reviewsError}</p>
                </div>
            )}

            <div className={styles.reviewsBox}>
                {safeReviews.length === 0 && !reviewsLoading && (
                    <p>Пока нет отзывов</p>
                )}

                {safeReviews.map((r) => (
                    <div key={r.id} className={styles.reviewItem}>
                        <p>{"⭐".repeat(r.score)}</p>
                        <p>{r.description}</p>
                        <hr />
                    </div>
                ))}
            </div>

            {/* FORM */}
            <div className={styles.reviewForm}>
                <input
                    type="text"
                    placeholder="Номер заказа"
                    value={orderNumber}
                    onChange={(e) =>
                        setOrderNumber(e.target.value)
                    }
                />

                <select
                    value={score}
                    onChange={(e) =>
                        setScore(Number(e.target.value))
                    }
                >
                    {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>

                <textarea
                    placeholder="Ваш отзыв"
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                />

                <button onClick={handleAddReview}>
                    Оставить отзыв
                </button>
            </div>
        </div>
    );
}