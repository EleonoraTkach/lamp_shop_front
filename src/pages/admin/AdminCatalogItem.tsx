import React from "react";
import styles from "../styles/catalog.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/actions/productActions";

const AdminCatalogItem = React.memo(({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className={styles.productCard}>
            <div className={styles.productTitle}>{product.name}</div>

            <div className={styles.productPrice}>{product.price} ₽</div>

            <div>
                {product.quantity > 0
                    ? `Количество: ${product.quantity}`
                    : "Нет в наличии"}
            </div>

            <div className={styles.productActions}>
                <button onClick={() => navigate(`/admin/product/${product.id}`)}>
                    Подробнее
                </button>
                <button
                    onClick={() => dispatch(deleteProduct(product.id))}
                    className={styles.deleteBtn}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
});

AdminCatalogItem.displayName = "ProductCard";
export default AdminCatalogItem;
