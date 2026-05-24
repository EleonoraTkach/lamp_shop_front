import { useState, useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { request } from "../api/api";
import { loadProducts } from "../store/actions/productActions";

import styles from "./styles/trackOrder.module.css";

export default function TrackOrder() {
    const dispatch = useDispatch();

  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(loadProducts());
        }, [dispatch]);
  const products = useSelector(
      (state) => state.products.products || []
  );

  const getProduct = (id) =>
      products.find((p) => p.id === id);

  const handleSearch = async () => {
    const trimmed = orderNumber.trim();

    if (!trimmed) {
      setError("Введите номер заказа");
      setOrder(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrder(null);

      const orderData = await request(
          `http://localhost:8001/orders/track/${trimmed}?delete_flg=False`
      );

      const itemsData = await request(
          `http://localhost:8001/orders/${orderData.id}/items?delete_flg=False`
      );

      setOrder({
        ...orderData,
        items: itemsData?.items ?? [],
      });
    } catch (e) {
      setError(e?.message || "Заказ не найден");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = (item, index, isCustom) => {
    if (isCustom) {
      return (
          <div
              key={`custom-${index}`}
              className={styles.trackItem}
          >
            <img
                src={item.image_url}
                alt="custom"
                width={60}
                height={60}
                style={{
                  objectFit: "cover",
                  borderRadius: 8,
                }}
            />

            <span>Кастомный товар #{index + 1}</span>

            <span>x{item.quantity}</span>
          </div>
      );
    }

    const product = getProduct(item.product_id);

    return (
        <div
            key={`product-${item.product_id}-${index}`}
            className={styles.trackItem}
        >
        <span>
          {product?.name || `Товар #${item.product_id}`}
        </span>

          <span>x{item.quantity}</span>
        </div>
    );
  };

  return (
      <div className={styles.trackContainer}>
        <h1 className={styles.trackTitle}>
          Отследить заказ
        </h1>

        <div className={styles.trackSearch}>
          <input
              type="text"
              placeholder="Введите номер заказа"
              value={orderNumber}
              onChange={(e) =>
                  setOrderNumber(e.target.value)
              }
          />

          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Поиск..." : "Найти"}
          </button>
        </div>

        {error && (
            <p className={styles.trackError}>{error}</p>
        )}

        {order && (
            <div className={styles.trackCard}>
              <h2>Информация о заказе</h2>

              <div className={styles.trackInfo}>
                <p>Номер: {order.order_number}</p>
                <p>Статус: {order.status}</p>
                <p>Сумма: {order.total_cost} ₽</p>
                <p>Обновлён: {order.updated_at}</p>
                <p>
                  Тип: {order.is_custom ? "Кастомный" : "Обычный"}
                </p>
              </div>

              <h3>Товары:</h3>

              <div className={styles.trackItems}>
                {!order.items?.length && <p>Нет товаров</p>}

                {order.items?.map((item, index) =>
                    renderItem(item, index, order.is_custom)
                )}
              </div>
            </div>
        )}
      </div>
  );
}