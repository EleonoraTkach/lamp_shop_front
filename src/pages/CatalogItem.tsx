import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/actions/cartActions";
import styles from "./styles/catalog.module.css";

const CatalogItem = React.memo(({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.productCard}>
            <div className={styles.productTitle}>{product.name}</div>
            <div className={styles.productPrice}>{product.price} ₽</div>

            <div className={styles.productActions}>
                {product.quantity > 0 ? (
                    <button onClick={() => dispatch(addToCart(product, 1))}>
                        В корзину
                    </button>
                ) : (
                    <p className={styles.outOfStock}>Нет в наличии</p>
                )}
            </div>

            <Link to={`/product/${product.id}`} className={styles.detailsLink}>
                Подробнее
            </Link>
        </div>
    );
});

CatalogItem.displayName = "ProductCard";
export default CatalogItem;
