import { useCart } from "../context/CartContext";
import { useState } from "react";
import "./styles/Cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleOrder = () => {
    if (!name || !phone) {
      alert("Заполните ФИО и телефон");
      return;
    }

    alert("Заказ оформлен!");
  };

  return (
    <div className="cart-layout">

      <div className="cart-items">

        <h2 className="cart-title">Корзина</h2>

        {cart.length === 0 && (
          <p className="cart-empty">Корзина пустая</p>
        )}

        {cart.map(item => (
          <div key={item.id} className="cart-item">

            <h4>{item.name}</h4>

            <p>{item.price} ₽</p>

            <div className="cart-controls">

              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                -
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>

            </div>
			
			<button
                className="cart-remove"
                onClick={() => removeFromCart(item.id)}
            >
                Удалить
            </button>

          </div>
        ))}

      </div>

      <div className="cart-checkout">

        <h2>Оформление</h2>

        <div className="cart-total">
          Итого: {total} ₽
        </div>

        <input
          type="text"
          placeholder="ФИО"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={handleOrder}>
          Оформить заказ
        </button>

      </div>

    </div>
  );
}