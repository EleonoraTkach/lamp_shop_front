import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadReviews } from "../store/actions/reviewActions";
import { loadProductsById } from "../store/actions/productActions";

import ProductDetail from "./ProductDetail";
import ReviewsList from "./ReviewsList";
import ReviewForm from "./ReviewForm";
import styles from "./styles/product.module.css";

export default function Product() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const product = useSelector((state) => state.products.selectedProduct);
    const productLoading = useSelector((state) => state.products.loading);
    const productError = useSelector((state) => state.products.error);

    const reviews = useSelector((state) => state.reviews.reviews);
    const reviewsLoading = useSelector((state) => state.reviews.loading);
    const reviewsError = useSelector((state) => state.reviews.error);

    useEffect(() => {
        if (id) {
            dispatch(loadProductsById(id));
            dispatch(loadReviews(id));
        }
    }, [id, dispatch]);

    if (productLoading) return <div className={styles.productPage}><p>Загрузка товара...</p></div>;
    if (productError) return <div className={styles.errorBox}><p>{productError}</p></div>;
    if (!product) return <div className={styles.productPage}><p>Товар не найден</p></div>;

    return (
        <div className={styles.productPage}>
            <button
                className={styles.productBack}
                onClick={() => window.history.back()}
            >
                ← Назад
            </button>

            <ProductDetail product={product} />

            <ReviewsList
                reviews={reviews}
                loading={reviewsLoading}
                error={reviewsError}
            />

            <ReviewForm productId={id} />
        </div>
    );
}
