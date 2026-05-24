import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    loadOrderById,
    updateOrderStatus,
    updateItemQuantity,
    deleteOrderItem,
    deleteOrderById,
    updateOrderInfo,
} from "../../store/actions/orderDetailsActions";

import styles from "../styles/orderDetails.module.css";

export default function AdminOrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { order, items, loading, error } = useSelector(
        (s) => s.orderDetails
    );

    const [localItems, setLocalItems] = useState([]);
    const [orderLocal, setOrderLocal] = useState(null);


    useEffect(() => {
        dispatch(loadOrderById(id));
    }, [id]);


    useEffect(() => {
        setLocalItems(items);
    }, [items]);

    useEffect(() => {
        if (order) {
            setOrderLocal(order);
        }
    }, [order]);

    if (loading || !orderLocal) return <p>Загрузка...</p>;

    return (
        <div className={styles.page}>
            <button onClick={() => navigate(-1)}>
                ← Назад
            </button>

            {error && (
                <div className={styles.errorBox}>
                    {error}
                </div>
            )}

            <h1>Заказ #{order.id}</h1>

            <p>Номер заказа: {order.order_number}</p>
            <p>Статус: {order.status}</p>
            <div>
                <label>Сумма:</label>
                <input
                    type="number"
                    value={orderLocal.total_cost}
                    onChange={(e) =>
                        setOrderLocal({ ...orderLocal, total_cost: e.target.value })
                    }
                />
                <span> ₽</span>
            </div>

            <div>
                <label>ФИО:</label>
                <input
                    type="text"
                    value={orderLocal.user_full_name}
                    onChange={(e) =>
                        setOrderLocal({ ...orderLocal, user_full_name: e.target.value })
                    }
                />
            </div>

            <div>
                <label>Телефон:</label>
                <input
                    type="text"
                    value={orderLocal.phone_number}
                    onChange={(e) =>
                        setOrderLocal({ ...orderLocal, phone_number: e.target.value })
                    }
                />
            </div>

            <button onClick={()=>dispatch(updateOrderInfo(id, Number(orderLocal.total_cost),orderLocal.user_full_name,orderLocal.phone_number))}>
                Сохранить изменения
            </button>

            <div className={styles.actions}>
                {orderLocal.is_custom ? (
                    <button onClick={() => dispatch(updateOrderStatus(id, "accepted"))}>
                        Одобрен
                    </button>
                ):(
                    <></>
                )}
                <button onClick={() => dispatch(updateOrderStatus(id, "in_progress"))}>
                    В работу
                </button>

                <button onClick={() => dispatch(updateOrderStatus(id, "ready_for_pickup"))}>
                    Готов к выдаче
                </button>

                <button onClick={() => dispatch(updateOrderStatus(id, "delivered"))}>
                    Выдан
                </button>

                <button onClick={() => dispatch(updateOrderStatus(id, "canceled"))}>
                    Отменить
                </button>
            </div>

            <button
                className={styles.deleteBtn}
                onClick={() => dispatch(deleteOrderById(id, navigate))}
            >
                Удалить заказ
            </button>

            <h2>Товары</h2>

            {localItems.map((item) => (
                <div key={item.id} className={styles.item}>

                    {!orderLocal.is_custom ? (
                        <div className={styles.itemInfo}>
                            <div className={styles.itemTitle}>
                                {item.product?.name || `Товар #${item.product_id}`}
                            </div>

                            <div>
                                Цена: {item.product?.price || 0} ₽
                            </div>
                        </div>
                    ) : (
                        <div className={styles.itemInfo}>
                            <div>
                                Товар #{item.id}
                            </div>

                            <img
                                src={item.image_url}
                                alt={`Товар ${item.product_id}`}
                                className={styles.customImage}
                            />

                            <div>
                                Кол-во: {item.quantity}
                            </div>
                        </div>
                    )}

                    <div className={styles.itemActions}>
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                                setLocalItems((prev) =>
                                    prev.map((i) =>
                                        i.id === item.id
                                            ? { ...i, quantity: Number(e.target.value) }
                                            : i
                                    )
                                )
                            }
                        />

                        <button
                            onClick={() =>
                                dispatch(updateItemQuantity(order.id, item.id, item.quantity))
                            }
                        >
                            Сохранить
                        </button>

                        <button
                            className={styles.deleteBtn}
                            onClick={() =>
                                dispatch(deleteOrderItem(order.id,item.id))
                            }
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}