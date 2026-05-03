import { useState } from "react";
import { orders } from "../data/mockData";
import "./styles/TrackOrder.css";

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const found = orders.find(
      o => o.order_number === orderNumber
    );

    if (!found) {
      setError("Заказ не найден");
      setOrder(null);
    } else {
      setOrder(found);
      setError("");
    }
  };

  return (
    <div className="track-container">

      <h1 className="track-title">Отследить заказ</h1>

      <div className="track-search">
        <input
          type="text"
          placeholder="Введите номер заказа"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />

        <button onClick={handleSearch}>
          Найти
        </button>
      </div>

      {error && <p className="track-error">{error}</p>}

      {order && (
        <div className="track-card">

          <h2>Информация о заказе</h2>

          <div className="track-info">
            <p>Номер: {order.order_number}</p>
            <p>Статус: {order.status}</p>
            <p>Сумма: {order.total_cost} ₽</p>
            <p>Обновлён: {order.updated_at}</p>
          </div>

          <h3>Товары:</h3>

          <div className="track-items">
            {order.items.map(item => (
              <div key={item.product_id} className="track-item">
                <span>{item.name}</span>
                <span>x{item.quantity}</span>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}