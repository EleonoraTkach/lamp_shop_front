import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../store/actions/orderDetailsActions";
import styles from "../styles/orderDetails.module.css";

export default function AdminOrderDetailsStatus({ orderId, isCustom }) {
    const dispatch = useDispatch();

    return (
        <div className={styles.actions}>
            {isCustom && (
                <button onClick={() => dispatch(updateOrderStatus(orderId, "accepted"))}>
                    Одобрен
                </button>
            )}
            <button onClick={() => dispatch(updateOrderStatus(orderId, "in_progress"))}>В работу</button>
            <button onClick={() => dispatch(updateOrderStatus(orderId, "ready_for_pickup"))}>Готов к выдаче</button>
            <button onClick={() => dispatch(updateOrderStatus(orderId, "delivered"))}>Выдан</button>
            <button onClick={() => dispatch(updateOrderStatus(orderId, "canceled"))}>Отменить</button>
        </div>
    );
}
