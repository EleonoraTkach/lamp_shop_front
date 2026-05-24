import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    loadProductsById,
    updateProduct,
    deleteProduct,
} from "../../store/actions/productActions";

import {
    loadReviews,
    deleteReview,
} from "../../store/actions/reviewActions";

import styles from "../styles/product.module.css";

export default function AdminProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedProduct, loading } = useSelector(
        (s) => s.products
    );

    const { reviews } = useSelector((s) => s.reviews);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (!id) return;

        dispatch(loadProductsById(id));
        dispatch(loadReviews(id));
    }, [id]);

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setPrice(selectedProduct.price);
            setQuantity(selectedProduct.quantity);
        }
    }, [selectedProduct]);

    if (loading || !selectedProduct) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className={styles.productPage}>
            <button
                className={styles.productBack}
                onClick={() => navigate(-1)}
            >
                ← Назад
            </button>

            <div className={styles.productCardDetail}>
                <h2 className={styles.productTitle}>
                    Редактирование товара
                </h2>

                <input
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <input
                    type="number"
                    value={price}
                    onChange={(e) =>
                        setPrice(Number(e.target.value))
                    }
                />

                <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(
                            Number(e.target.value)
                        )
                    }
                />

                <div className={styles.productActions}>
                    <button
                        onClick={() =>
                            dispatch(
                                updateProduct(id, {
                                    name,
                                    price,
                                    quantity,
                                })
                            )
                        }
                    >
                        Сохранить
                    </button>

                    <button
                        className={styles.deleteBtn}
                        onClick={() =>
                            dispatch(
                                deleteProduct(
                                    id,
                                    navigate
                                )
                            )
                        }
                    >
                        Удалить товар
                    </button>
                </div>
            </div>

            <h2>Отзывы</h2>

            <div className={styles.reviewsBox}>
                {reviews?.length === 0 && (
                    <p>Нет отзывов</p>
                )}

                {reviews?.map((r) => (
                    <div
                        key={r.id}
                        className={styles.reviewItem}
                    >
                        <p>{"⭐".repeat(r.score)}</p>
                        <p>{r.description}</p>

                        <button
                            className={styles.deleteBtn}
                            onClick={() =>
                                dispatch(
                                    deleteReview(id, r.id)
                                )
                            }
                        >
                            Удалить отзыв
                        </button>

                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}