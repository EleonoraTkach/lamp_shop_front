import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loadOrderById, deleteOrderById, updateOrderInfo } from "../../store/actions/orderDetailsActions";

import styles from "../styles/orderDetails.module.css";

import AdminOrderDetailsStatus from "./AdminOrderDetailsStatus";
import AdminOrderDetailsItem from "./AdminOrderDetailsItem";


export default function AdminOrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { order, items, loading, error } = useSelector((s) => s.orderDetails);
    const [orderLocal, setOrderLocal] = useState(null);

    useEffect(() => {
        dispatch(loadOrderById(id));
    }, [id]);

    useEffect(() => {
        if (order) setOrderLocal(order);
    }, [order]);

    if (loading || !orderLocal) return <p>Загрузка...</p>;

    const handleSaveOrderInfo = () => {
        const totalCostStr = String(orderLocal.total_cost).trim();
        const fullNameStr = String(orderLocal.user_full_name).trim();
        const phoneStr = String(orderLocal.phone_number).trim();
        const parsedCost = Number(orderLocal.total_cost);

        if (totalCostStr === "" || isNaN(parsedCost) || parsedCost < 0) {
            alert("Сумма заказа не может быть пустой или отрицательной.");
            setOrderLocal(order);
            return;
        }
        if (!fullNameStr) {
            alert("Поле ФИО не может быть пустым.");
            setOrderLocal(order);
            return;
        }
        if (!phoneStr) {
            alert("Поле телефона не может быть пустым.");
            setOrderLocal(order);
            return;
        }

        dispatch(updateOrderInfo(id, parsedCost, fullNameStr, phoneStr));
    };

    return (
        <div className={styles.page}>

            <button className={styles.backButton} onClick={() => navigate(-1)}>
                ← Назад
            </button>

            {error && <div className={styles.errorBox}>{error}</div>}

            <div className={styles.orderCard}>
                <h1 className={styles.orderTitle}>Заказ #{order.id}</h1>
                <p>Номер заказа: {order.order_number}</p>

                <div>
                    Статус: <span className={styles.status}>{order.status}</span>
                </div>

                <div className={styles.orderInfoRow}>
                    <label>Сумма:</label>
                    <div className={styles.priceWrapper}>
                        <input
                            className={styles.orderInput}
                            type="number"
                            min="0"
                            step="0.01"
                            value={orderLocal.total_cost}
                            onChange={(e) => setOrderLocal({ ...orderLocal, total_cost: e.target.value === "" ? "" : Number(e.target.value) })}
                        />
                        <span>₽</span>
                    </div>
                </div>

                <div className={styles.orderInfoRow}>
                    <label>ФИО клиента:</label>
                    <input
                        className={styles.orderInput}
                        type="text"
                        value={orderLocal.user_full_name}
                        onChange={(e) => setOrderLocal({ ...orderLocal, user_full_name: e.target.value })}
                    />
                </div>

                <div className={styles.orderInfoRow}>
                    <label>Телефон:</label>
                    <input
                        className={styles.orderInput}
                        type="text"
                        value={orderLocal.phone_number}
                        onChange={(e) => setOrderLocal({ ...orderLocal, phone_number: e.target.value })}
                    />
                </div>

                <button className={styles.mainSaveBtn} onClick={handleSaveOrderInfo}>
                    Сохранить изменения
                </button>
            </div>

            <AdminOrderDetailsStatus orderId={id} isCustom={orderLocal.is_custom} />

            <button
                className={styles.deleteBtn}
                onClick={async () => {
                    await dispatch(deleteOrderById(id));
                    navigate(-1);
                }}
            >
                Удалить заказ
            </button>

            <h2 className={styles.itemsTitle}>Товары в заказе</h2>
            <div className={styles.itemsList}>
                {items.map((item) => (
                    <AdminOrderDetailsItem
                        key={item.id}
                        item={item}
                        orderId={order.id}
                        originalItems={items}
                        isCustomOrder={orderLocal.is_custom}
                    />
                ))}
            </div>
        </div>
    );
}