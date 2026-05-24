import { Link, useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "../styles/header.module.css";
import { logout } from "../../store/actions/authActions";

export default function AdminHeader() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutClick = () => {
		dispatch(logout());
		navigate("/admin/login");
	};

	return (
		<header className={styles.header}>

			<nav className={styles.nav}>
				<Link to="/admin/categories">Категории</Link>
				<Link to="/admin/catalog/all">Товары</Link>
				<Link to="/admin/orders">Заказы</Link>
				<Link to="/admin/login" onClick={logoutClick}>Выйти</Link>
			</nav>
		</header>
	);
}