import { Link } from "react-router-dom";
import { categories } from "../data/mockData";
import "./styles/Category.css";

export default function Categories() {
  return (
    <div className="categories-container">
      
      <h1 className="categories-title">Категории</h1>

      <div className="categories-grid">

        <Link to="/catalog" className="category-card">
          Все товары
        </Link>

        {categories.map(cat => (
          <Link
            key={cat.id}
            to={`/catalog/${cat.id}`}
            className="category-card"
          >
            {cat.name}
          </Link>
        ))}

      </div>
    </div>
  );
}