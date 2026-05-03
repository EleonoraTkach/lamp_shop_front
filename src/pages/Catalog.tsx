import { useParams, Link } from "react-router-dom";
import { products } from "../data/mockData";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./styles/Catalog.css"

export default function Catalog() {
  const { addToCart } = useCart();
  const { categoryId } = useParams();

  const [search, setSearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState("");

  let filtered = products;

  if (categoryId) {
    filtered = filtered.filter(
      p => p.category_id === Number(categoryId)
    );
  }

  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (onlyAvailable) {
    filtered = filtered.filter(p => p.quantity > 0);
  }

  if (sort === "asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }

  if (sort === "desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="catalog-layout">

      <div className="catalog-sidebar">

        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={() => setOnlyAvailable(!onlyAvailable)}
          />
          Только в наличии
        </label>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Сортировка</option>
          <option value="asc">Цена: по возрастанию</option>
          <option value="desc">Цена: по убыванию</option>
        </select>

      </div>

      <div className="catalog-main">

        <Link to="/" className="back-link">
          ← Назад
        </Link>

        <div className="products-grid">

          {filtered.map(p => (
            <div key={p.id} className="product-card">

              <div className="product-title">
                {p.name}
              </div>

              <div className="product-price">
                {p.price} ₽
              </div>

              <div className="product-actions">

                {p.quantity > 0 ? (
                  <button onClick={() => addToCart(p, 1)}>
                    В корзину
                  </button>
                ) : (
                  <p style={{ color: "red" }}>Нет в наличии</p>
                )}

              </div>

              <Link to={`/product/${p.id}`}>
                Подробнее
              </Link>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}