import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./styles/Header.css";

export default function Header() {

  const { cart } = useCart();

  const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  return (
	  <header>
		<nav>
		  <Link to="/">Каталог</Link>
		  <Link to="/cart">Корзина ({totalCount})</Link>
		  <Link to="/track">Отследить заказ</Link>
		  <Link to="/preorder">Предзаказ</Link>
		</nav>
	  </header>
  );
}