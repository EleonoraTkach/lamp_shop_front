import { useEffect, useState } from "react";
import { request } from "../api/api";

import styles from "./styles/preorder.module.css";

export default function Preorder() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("preorder_items");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [url, setUrl] = useState("");
  const [count, setCount] = useState(1);
  const [orderNumber, setOrderNumber] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("preorder_items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!url.trim()) return;

    const newItem = {
      image_url: url.trim(),
      quantity: Math.max(1, Number(count) || 1),
    };

    setItems((prev) => [...prev, newItem]);

    setUrl("");
    setCount(1);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQty = (index, value) => {
    const qty = Math.max(1, Number(value) || 1);

    setItems((prev) =>
        prev.map((item, i) =>
            i === index ? { ...item, quantity: qty } : item
        )
    );
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || items.length === 0) {
      alert("Заполните данные и добавьте товары");
      return;
    }

    const payload = {
      order: {
        user_full_name: name,
        phone_number: phone,
        custom: true,
      },
      items: items.map((i) => ({
        image_url: i.image_url,
        quantity: i.quantity,
      })),
    };

    try {
      setLoading(true);

      const response = await request(
          "http://localhost:8001/orders/custom",
          "POST",
          payload
      );

      alert("Предзаказ оформлен!");
      setOrderNumber(response.order.order_number);

      setItems([]);
      setName("");
      setPhone("");

      localStorage.removeItem("preorder_items");
    } catch (e) {
      alert(e.message || "Ошибка оформления предзаказа");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className={styles.preorderLayout}>
        <div className={styles.preorderItems}>
          <h2 className={styles.preorderTitle}>
            Позиции предзаказа
          </h2>

          <input
              placeholder="URL изображения"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
          />

          <input
              type="number"
              min="1"
              value={count}
              onChange={(e) => setCount(e.target.value)}
          />

          <button
              className={styles.preorderAdd}
              onClick={addItem}
          >
            Добавить
          </button>

          <hr />

          {items.length === 0 && <p>Нет позиций</p>}

          {items.map((item, index) => (
              <div
                  key={index}
                  className={styles.preorderItem}
              >
                <div className={styles.preorderControls}>
                  <img
                      src={item.image_url}
                      className={styles.preorderImage}
                      alt=""
                      width="80"
                  />

                  <a
                      href={item.image_url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.preorderUrl}
                  >
                    {item.image_url}
                  </a>

                  <div className={styles.preorderQty}>
                    <button
                        onClick={() =>
                            updateQty(index, item.quantity - 1)
                        }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                        onClick={() =>
                            updateQty(index, item.quantity + 1)
                        }
                    >
                      +
                    </button>
                  </div>

                  <button
                      className={styles.preorderRemove}
                      onClick={() => removeItem(index)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
          ))}
        </div>

        <div className={styles.preorderClient}>
          <h2 className={styles.preorderTitle}>
            Данные клиента
          </h2>

          <input
              placeholder="ФИО"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />

          <input
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
          />

          <hr />

          <p>Всего позиций: {items.length}</p>

          <button
              className={styles.preorderSubmit}
              onClick={handleSubmit}
              disabled={loading}
          >
            {loading ? "Отправка..." : "Оформить предзаказ"}
          </button>

          {orderNumber && (
              <div className={styles.successBox}>
                <p>Предзаказ успешно оформлен</p>

                <p>
                  Номер заказа:{" "}
                  <strong>{orderNumber}</strong>
                </p>
              </div>
          )}
        </div>
      </div>
  );
}