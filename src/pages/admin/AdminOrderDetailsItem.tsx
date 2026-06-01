import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateItemQuantity, deleteOrderItem } from "../../store/actions/orderDetailsActions";
import styles from "../styles/orderDetails.module.css";

export default function AdminOrderDetailsItem({ item, orderId, originalItems, isCustomOrder }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    const handleSaveQuantity = () => {
        const parsedQty = Number(quantity);

        if (!quantity || parsedQty <= 0) {
            alert("Количество товара должно быть больше 0. Изменения не сохранены.");
            const originalItem = originalItems.find((i) => i.id === item.id);
            setQuantity(originalItem ? originalItem.quantity : 1);
            return;
        }

        dispatch(updateItemQuantity(orderId, item.id, parsedQty));
    };

    return (
        <div className={styles.item}>
            {!isCustomOrder ? (
                <div className={styles.itemInfo}>
                    <div className={styles.itemTitle}>
                        {item.product?.name || `Товар #${item.product_id}`}
                    </div>
                    {/* Добавлен класс .itemPrice */}
                    <div className={styles.itemPrice}>Цена: {item.price || 0} ₽</div>
                </div>
            ) : (
                <div className={styles.itemInfo}>
                    <div>Товар #{item.id}</div>
                    <img src={item.image_url} alt={`Товар ${item.product_id}`} className={styles.customImage} />
                    <div>Кол-во: {quantity}</div>
                </div>
            )}

            <div className={styles.itemActions}>
                <input
                    // Добавлен класс .quantityInput вместо дефолтных стилей
                    className={styles.quantityInput}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                />
                {/* Добавлен класс .saveBtn */}
                <button className={styles.saveBtn} onClick={handleSaveQuantity}>
                    Сохранить
                </button>
                <button className={styles.deleteBtn} onClick={() => dispatch(deleteOrderItem(orderId, item.id))}>
                    Удалить
                </button>
            </div>
        </div>
    );
}
