import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    loadProducts,
    deleteProduct,
    addProduct
} from "../../store/actions/productActions";

import {
    setSearch,
    setSort,
    setOnlyInStock,
} from "../../store/actions/catalogActions";

import styles from "../styles/catalog.module.css";

export default function AdminCatalog() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector(
        (s) => s.products
    );

    const { search, sort, onlyInStock } = useSelector(
        (s) => s.catalog
    );

    useEffect(() => {
        dispatch(loadProducts(categoryId));
    }, [categoryId]);

    const filteredProducts = products
        .filter((p) =>
            p.name
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .filter((p) =>
            onlyInStock ? p.quantity > 0 : true
        )
        .sort((a, b) => {
            if (sort === "cheap") return a.price - b.price;
            if (sort === "expensive")
                return b.price - a.price;
            return 0;
        });

    return (
        <div className={styles.catalogLayout}>
            {/* SIDEBAR */}
            <div className={styles.catalogSidebar}>
                <h3>Фильтры</h3>

                <input
                    placeholder="Поиск..."
                    value={search}
                    onChange={(e) =>
                        dispatch(
                            setSearch(e.target.value)
                        )
                    }
                />

                <select
                    value={sort}
                    onChange={(e) =>
                        dispatch(setSort(e.target.value))
                    }
                >
                    <option value="cheap">
                        Сначала дешёвые
                    </option>
                    <option value="expensive">
                        Сначала дорогие
                    </option>
                </select>

                <label>
                    <input
                        type="checkbox"
                        checked={onlyInStock}
                        onChange={(e) =>
                            dispatch(
                                setOnlyInStock(
                                    e.target.checked
                                )
                            )
                        }
                    />
                    Только в наличии
                </label>
            </div>

            <div className={styles.catalogMain}>
                <h1>
                    {categoryId === "all"
                        ? "Все товары"
                        : `Категория ${categoryId}`}
                </h1>

                {loading && <div>Загрузка...</div>}

                {error && (
                    <div className={styles.errorBlock}>
                        <h2 className={styles.errorTitle}>
                            Ошибка загрузки
                        </h2>

                        <p className={styles.errorText}>
                            {error}
                        </p>
                    </div>
                )}

                {!loading && !error && ( <>
                    {categoryId !== "all" && (
                        <button
                            className={styles.productCard}
                            onClick={() => {
                                const name = prompt("Введите название товара");
                                if (!name?.trim()) return;

                                const description = prompt("Введите описание товара");
                                if (!description?.trim()) return;

                                const quantityStr = prompt("Введите количество (>= 0)");
                                const quantity = Number(quantityStr);

                                if (Number.isNaN(quantity) || quantity < 0) {
                                    alert("Некорректное количество");
                                    return;
                                }

                                const priceStr = prompt("Введите цену (> 0)");
                                const price = Number(priceStr);

                                if (Number.isNaN(price) || price <= 0) {
                                    alert("Некорректная цена");
                                    return;
                                }

                                dispatch(
                                    addProduct(categoryId, {
                                        name: name.trim(),
                                        description:description.trim(),
                                        quantity,
                                        price,
                                    })
                                );
                            }}
                        >
                            + Добавить товар
                        </button>
                    )}
                    <p>Найдено товаров:{" "}{filteredProducts.length}</p>

                    <div className={styles.productsGrid}>
                        {filteredProducts.map((p) => (
                        <div key={p.id} className={styles.productCard}>
                            <div className={styles.productTitle}>{p.name}</div>

                            <div className={styles.productPrice}>{p.price} ₽</div>

                            <div>{p.quantity > 0 ? `Количество: ${p.quantity}` : "Нет в наличии"}</div>

                            <div className={styles.productActions}>
                                <button onClick={() => navigate(`/admin/product/${p.id}`)}>
                                    Подробнее
                                </button>

                                <button
                                    onClick={() => dispatch(deleteProduct(p.id))}
                                    className={styles.deleteBtn}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                    </>)}
            </div>
        </div>
    );
}