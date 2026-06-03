import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addProduct } from "../../store/actions/productActions";
import styles from "../styles/createProduct.module.css";

const initialFormState = {
    name: "",
    description: "",
    quantity: "",
    price: ""
};
export default function AdminCreateProduct() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initialFormState);

    const [error, setError] = useState("");

    const handleClear = () => {
        setFormData(initialFormState);
        setError("");
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, description, quantity, price } = formData;

        if (!name.trim() || !description.trim()) {
            setError("Заполните название и описание товара");
            return;
        }

        const parsedQuantity = Number(quantity);
        if (quantity === "" || Number.isNaN(parsedQuantity) || parsedQuantity < 0) {
            setError("Количество должно быть числом больше или равным 0");
            return;
        }

        const parsedPrice = Number(price);
        if (price === "" || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
            setError("Цена должна быть числом строго больше 0");
            return;
        }

        dispatch(
            addProduct(categoryId, {
                name: name.trim(),
                description: description.trim(),
                quantity: parsedQuantity,
                price: parsedPrice,
            })
        );

        navigate(-1);
    };

    return (
        <div className={styles.container}>
            <button
                type="button"
                onClick={() => navigate(-1)}
                className={styles.backBtn}
            >
                ← Назад к категории
            </button>

            <h2>Добавление нового товара</h2>


            {error && <div className={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Название товара</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Название товара..."
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Опишите характеристики товара..."
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="quantity">Количество на складе</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="0"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="0"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="price">Цена (руб)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        min="0.01"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="99.99"
                    />
                </div>

                <div className={styles.actions}>
                    <button type="button" onClick={handleClear} className={styles.cancelBtn}>
                        Очистить все поля
                    </button>
                    <button type="submit" className={styles.submitBtn}>
                        Создать товар
                    </button>
                </div>
            </form>
        </div>
    );
}
