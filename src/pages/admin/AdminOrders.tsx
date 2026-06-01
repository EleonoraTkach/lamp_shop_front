import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../../store/actions/ordersActions";
import styles from "../styles/orders.module.css";

const STATUS_FILTERS = [
    "all",
    "created",
    "in_progress",
    "accepted",
    "ready_for_pickup",
    "delivered",
    "canceled",
];

export default function AdminOrders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orders, loading, error } = useSelector(
        (s) => s.orders
    );

    // filters (можно тоже в redux, но оставим локально)
    const [status, setStatus] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [search, setSearch] = useState("");

    // LOAD
    useEffect(() => {
        dispatch(fetchOrders());
    }, []);

    // FILTERS
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const statusMatch =
                status === "all" ||
                order.status === status;

            const typeMatch =
                typeFilter === "all" ||
                (typeFilter === "custom" &&
                    order.is_custom) ||
                (typeFilter === "regular" &&
                    !order.is_custom);

            const searchMatch =
                order.order_number
                    ?.toString()
                    .toLowerCase()
                    .includes(search.toLowerCase());

            return (
                statusMatch &&
                typeMatch &&
                searchMatch
            );
        });
    }, [orders, status, typeFilter, search]);

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>
                Заказы
            </h1>

            <input
                type="text"
                placeholder="Поиск по номеру заказа"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className={styles.searchInput}
            />

            <div className={styles.filters}>
                {STATUS_FILTERS.map((s) => (
                    <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={status === s ? styles.active : ""}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className={styles.typeFilters}>
                <button
                    onClick={() => setTypeFilter("all")}
                    className={typeFilter === "all" ? styles.active : ""}
                >
                    Все
                </button>

                <button
                    onClick={() => setTypeFilter("regular")}
                    className={typeFilter === "regular" ? styles.active : ""}
                >
                    Обычные
                </button>

                <button
                    onClick={() => setTypeFilter("custom")}
                    className={typeFilter === "custom" ? styles.active : ""}
                >
                    Кастомные
                </button>
            </div>


            {loading && <p>Загрузка...</p>}

            {error && (
                <p style={{ color: "red" }}>{error}</p>
            )}

            <div className={styles.list}>
                {filteredOrders.map((order) => (
                    <div
                        key={order.id}
                        className={styles.card}
                        onClick={() =>
                            navigate(
                                `/admin/orders/${order.id}`
                            )
                        }
                    >
                        <div className={styles.info}>
                            <div className={styles.orderId}>
                                Заказ #{order.id}
                            </div>

                            <div>
                                Номер заказа:{" "}
                                {order.order_number}
                            </div>

                            <div
                                className={
                                    order.is_custom
                                        ? styles.customBadge
                                        : styles.regularBadge
                                }
                            >
                                {order.is_custom ? "Кастомный" : "Обычный"}
                            </div>

                            <div className={styles.status}>
                                Статус: {order.status}
                            </div>
                        </div>

                        <div className={styles.price}>
                            {order.total_cost} ₽
                        </div>
                    </div>
                ))}

                {!loading &&
                    filteredOrders.length === 0 && (
                        <div className={styles.empty}>
                            Ничего не найдено
                        </div>
                    )}
            </div>
        </div>
    );
}