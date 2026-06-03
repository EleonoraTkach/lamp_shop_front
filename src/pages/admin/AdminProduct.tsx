import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    loadProductsById,
    updateProduct,
    deleteProduct,
} from "../../store/actions/productActions";

import { loadReviews } from "../../store/actions/reviewActions";

import styles from "../styles/product.module.css";
import AdminReviewItem from "./AdminReviewItem.tsx";

export default function AdminProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedProduct, loading } = useSelector(
        (s) => s.products
    );

    const { reviews } = useSelector((s) => s.reviews);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        if (!id) return;

        dispatch(loadProductsById(id));
        dispatch(loadReviews(id));
    }, [id]);

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setDescription(selectedProduct.description);
            setPrice(selectedProduct.price);
            setQuantity(selectedProduct.quantity);
        }
    }, [selectedProduct]);

    const handleSave = () => {
        const parsedPrice = Number(price);
        const parsedQuantity = Number(quantity);

        if (price === "" || parsedPrice <= 0) {
            alert("Цена товара должна быть больше 0. Изменения не сохранены.");
            setPrice(selectedProduct ? selectedProduct.price : 0);
            setQuantity(selectedProduct ? selectedProduct.quantity : 0);
            return;
        }

        if (quantity === "" || parsedQuantity < 0) {
            alert("Количество товара не может быть отрицательным или пустым. Изменения не сохранены.");
            setPrice(selectedProduct ? selectedProduct.price : 0);
            setQuantity(selectedProduct ? selectedProduct.quantity : 0);
            return;
        }

        if (!name.trim()) {
            alert("Название товара не может быть пустым. Изменения не сохранены.");
            setName(selectedProduct ? selectedProduct.name : "");
            return;
        }

        if (!description.trim()) {
            alert("Описание товара не может быть пустым. Изменения не сохранены.");
            setName(selectedProduct ? selectedProduct.description : "");
            return;
        }

        dispatch(
            updateProduct(id, {
                name,
                description,
                price: parsedPrice,
                quantity: parsedQuantity,
            })
        );
    };

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
                    className={styles.productInput}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название товара"
                />

                <textarea
                    className={styles.productInput}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание товара"
                />

                <input
                    className={styles.productInput}
                    type="number"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    placeholder="Цена"
                />

                <input
                    className={styles.productInput}
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    placeholder="Количество"
                />

                <div className={styles.productActions}>
                    <button onClick={handleSave}>
                        Сохранить
                    </button>

                    <button
                        className={styles.deleteBtn}
                        onClick={async () => {
                            await dispatch(deleteProduct(id));
                            navigate(-1);
                        }}
                    >
                        Удалить товар
                    </button>
                </div>
            </div>

            <h2>Отзывы</h2>

            <div className={styles.reviewsBox}>
                {reviews?.length === 0 && <p>Нет отзывов</p>}

                {reviews?.map((r) => (
                    <AdminReviewItem
                        key={r.id}
                        review={r}
                        productId={id}
                    />
                ))}
            </div>
        </div>
    );
}