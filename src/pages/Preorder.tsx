import { useEffect, useState } from "react";
import "./styles/Preorder.css";

export default function Preorder() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("preorder_items");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [url, setUrl] = useState("");
  const [count, setCount] = useState(1);

  useEffect(() => {
    localStorage.setItem("preorder_items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!url.trim()) return;

    const newItem = {
      id: Date.now(),
      image_url: url,
      quantity: count,
    };

    setItems(prev => [...prev, newItem]);
    setUrl("");
    setCount(1);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, value) => {
    setItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, quantity: Math.max(1, value) } : i
      )
    );
  };

  const handleSubmit = () => {
    if (!name || !phone || items.length === 0) {
      alert("Заполните данные и добавьте товары");
      return;
    }

    const preorder = {
      user_full_name: name,
      phone_number: phone,
      items,
    };

    console.log(preorder);

    alert("Предзаказ оформлен!");

    setItems([]);
    setName("");
    setPhone("");
  };

  return (
    <div className="preorder-layout">

      <div className="preorder-items">

        <h2 className="preorder-title">Позиции предзаказа</h2>

        <input
          placeholder="URL изображения"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />

		<button className="preorder-add" onClick={addItem}>
		  Добавить
		</button>

        <hr />

        {items.length === 0 && <p>Нет позиций</p>}

        {items.map(item => (
          <div key={item.id} className="preorder-item">

            <img
              src={item.image_url}
              alt=""
              width="80"
            />

			<div className="preorder-controls">
			
			  <img
				  src={item.image_url}
				  className="preorder-image"
				  alt=""
				  width="80"
			  />
			  <a href={item.image_url} target="_blank" className="preorder-url">
				  {item.image_url}
			  </a>

			  <div className="preorder-qty">

				<button onClick={() => updateQty(item.id, item.quantity - 1)}>
				  -
				</button>

				<span>{item.quantity}</span>

				<button onClick={() => updateQty(item.id, item.quantity + 1)}>
				  +
				</button>

			  </div>

			  <button
				className="preorder-remove"
				onClick={() => removeItem(item.id)}
			  >
				Удалить
			  </button>

			</div>

          </div>
        ))}

      </div>

      <div className="preorder-client">

        <h2 className="preorder-title">Данные клиента</h2>

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

		<button className="preorder-submit" onClick={handleSubmit}>
		  Оформить предзаказ
		</button>

      </div>

    </div>
  );
}