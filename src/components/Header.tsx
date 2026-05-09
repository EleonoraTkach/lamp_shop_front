import { Link } from "react-router-dom";
import styles from "./styles/header.module.css";

export default function Header() {
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<Link className={styles.link} to="/">Каталог</Link>
				<Link className={styles.link} to="/cart">Корзина</Link>
				<Link className={styles.link} to="/track">Отследить заказ</Link>
				<Link className={styles.link} to="/preorder">Предзаказ</Link>
			</nav>
		</header>
	);
}