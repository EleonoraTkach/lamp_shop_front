import { useParams } from "react-router-dom";
import { products, reviews as initialReviews } from "../data/mockData";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./styles/Product.css"

export default function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === Number(id));

  const [reviews, setReviews] = useState(
    initialReviews.filter(r => r.product_id === Number(id))
  );

  const [score, setScore] = useState(5);
  const [text, setText] = useState("");

  if (!product) return <p>Товар не найден</p>;

  const handleAddReview = () => {
    if (!text.trim()) return;

    const newReview = {
      id: Date.now(),
      product_id: product.id,
      score,
      description: text,
    };

    setReviews(prev => [newReview, ...prev]);
    setText("");
    setScore(5);
  };

  const avg =
    reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length || 0;

  return (
    <div className="product-page">

      <a className="product-back" onClick={() => window.history.back()}>
        ← Назад
      </a>

      <div className="product-card-detail">

        <div className="product-title">
          {product.name}
        </div>

        <div className="product-info">
          {product.description}
        </div>

        <div className="product-price">
          {product.price} ₽
        </div>

        <div className="product-info">
          В наличии: {product.quantity}
        </div>

        <div className="product-actions">

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.quantity === 0}
          >
            Добавить в корзину
          </button>

        </div>

      </div>

      <h2>Рейтинг: {avg.toFixed(1)} ⭐</h2>

      <h2>Отзывы</h2>

      <div className="reviews-box">

        {reviews.length === 0 && <p>Пока нет отзывов</p>}

        {reviews.map(r => (
          <div key={r.id} className="review-item">
            <p>{"⭐".repeat(r.score)}</p>
            <p>{r.description}</p>
            <hr />
          </div>
        ))}

      </div>

      <div className="review-form">

        <input
          type="text"
          placeholder="Номер заказа"
        />

        <select
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Ваш отзыв"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleAddReview}>
          Оставить отзыв
        </button>

      </div>

    </div>
  );
}