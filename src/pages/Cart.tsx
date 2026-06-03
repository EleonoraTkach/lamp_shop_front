import { useState } from "react";
import {useDispatch, useSelector,} from "react-redux";
import { Link } from "react-router-dom";

import {removeFromCart, updateQuantity,} from "../store/actions/cartActions";
import {createOrderWithItems,} from "../store/actions/orderActions";
import styles from "./styles/cart.module.css";

export default function Cart() {
  const dispatch = useDispatch();


  const cart = useSelector(
      (state) => state.cartState.cart
  );

  const {loading, error} = useSelector((state) => state.order);

  const total = cart.reduce(
      (sum, item) =>
          sum + item.price * item.quantity,
      0
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleOrder = async () => {
    if (!name.trim() || !phone.trim()) {
      alert("Заполните ФИО и телефон");
      return;
    }

    if (cart.length === 0) {
      alert("Корзина пустая");
      return;
    }

    const result = await dispatch(createOrderWithItems(name, phone, cart));


    if (result.success) {
        setOrderSuccess(true);

        setOrderNumber(result.data.order.order_number);

        setName("");
        setPhone("");
    } else {
      alert(result.error);
    }
  };

  return (
      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          <h2 className={styles.cartTitle}>
            Корзина
          </h2>

          {cart.length === 0 && (
              <p className={styles.cartEmpty}>
                Корзина пуста
              </p>
          )}

          {cart.map((item) => (
              <div
                  key={item.id}
                  className={styles.cartItem}
              >
                <Link to={`/product/${item.id}`} className={styles.cartItemLink}>
                  <h4>{item.name}</h4>
                </Link>

                <p>{item.price} ₽</p>

                <div className={styles.cartControls}>
                  <button
                      onClick={() =>
                          dispatch(
                              updateQuantity(item.id, item.quantity - 1)
                          )
                      }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                      onClick={() =>
                          dispatch(updateQuantity(item.id, item.quantity + 1))
                      }
                  >
                    +
                  </button>
                </div>

                <button
                    className={styles.cartRemove}
                    onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Удалить
                </button>
              </div>
          ))}
        </div>

        <div className={styles.cartCheckout}>
          <h2>Оформление</h2>

          <div className={styles.cartTotal}>
            Итого: {total} ₽
          </div>

          <input
              type="text"
              placeholder="ФИО"
              value={name}
              onChange={(e) =>
                  setName(e.target.value)
              }
          />

          <input
              type="text"
              placeholder="Телефон"
              value={phone}
              onChange={(e) =>
                  setPhone(e.target.value)
              }
          />

          {error && (
              <div className={styles.errorBox}>
                {typeof error === "string" ? error : error.detail || JSON.stringify(error)}
              </div>
          )}

          <button
              onClick={handleOrder}
              disabled={loading || cart.length === 0}
          >
            {loading ? "Оформление..." : "Оформить заказ"}
          </button>

          {orderSuccess && (
              <div className={styles.successBox}>
                <p>Заказ успешно оформлен</p>

                <p> Номер заказа:{" "}
                  <strong>{orderNumber}</strong>
                </p>

                <button
                    onClick={() => navigator.clipboard.writeText(orderNumber)}
                >
                  Скопировать номер
                </button>
              </div>
          )}
        </div>
      </div>
  );
}