import styles from "./styles/product.module.css";

export default function ReviewsList({ reviews, loading, error }) {
    const safeReviews = Array.isArray(reviews) ? reviews : [];

    const avg = safeReviews.length
        ? safeReviews.reduce((s, r) => s + Number(r.score || 0), 0) / safeReviews.length
        : 0;

    return (
        <>
            <h2>Рейтинг: {avg.toFixed(1)} ⭐</h2>
            <h2>Отзывы</h2>

            {loading && <p>Загрузка отзывов...</p>}

            {error && (
                <div className={styles.errorBox}>
                    <p>⚠ Ошибка отзывов</p>
                    <p>{error}</p>
                </div>
            )}

            <div className={styles.reviewsBox}>
                {safeReviews.length === 0 && !loading && <p>Пока нет отзывов</p>}

                {safeReviews.map((r) => (
                    <div key={r.id} className={styles.reviewItem}>
                        <p>{"⭐".repeat(r.score)}</p>
                        <p>{r.description}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    );
}
