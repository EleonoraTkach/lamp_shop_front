import { useEffect } from "react";
import { useParams, Link, useLocation  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loadProducts } from "../../store/actions/productActions";

import {
    setSearch,
    setSort,
    setOnlyInStock,
} from "../../store/actions/catalogActions";

import styles from "../styles/catalog.module.css";
import AdminCatalogItem from "./AdminCatalogItem.tsx";

export default function AdminCatalog() {
    const { categoryId } = useParams();
    const location = useLocation();
    const categoryName = location.state?.categoryName;

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
                    {categoryName || (categoryId === "all" ? "Все товары" : `Категория ${categoryId}`)}
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
                        <Link
                            to={`/admin/createProduct/${categoryId}`}
                            className={styles.productCard}
                        >
                            + Добавить товар
                        </Link>
                    )}
                    <p>Найдено товаров:{" "}{filteredProducts.length}</p>

                    <div className={styles.productsGrid}>
                        {filteredProducts.map((p) => (
                            <AdminCatalogItem
                                key={p.id}
                                product={p}
                            />
                        ))}
                    </div>
                </>)}
            </div>
        </div>
    );
}