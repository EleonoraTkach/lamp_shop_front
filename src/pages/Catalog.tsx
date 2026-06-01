import { useEffect, useMemo, useState,} from "react";
import { useParams, Link, useLocation  } from "react-router-dom";
import { useDispatch, useSelector, } from "react-redux";
import { loadProducts, } from "../store/actions/productActions";
import styles from "./styles/catalog.module.css";
import CatalogItem from "./CatalogItem.tsx";

export default function Catalog() {
  const location = useLocation();
  const categoryName = location.state?.categoryName;
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [search, setSearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState("");

  const {products, loading, error} = useSelector(
      (state) => state.products
  );

  useEffect(() => {
    dispatch(loadProducts(categoryId));
  }, [dispatch, categoryId]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    filtered = filtered.filter((p) =>
        p.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    if (onlyAvailable) {
      filtered = filtered.filter(
          (p) => p.quantity > 0
      );
    }

    if (sort === "asc") {
      filtered.sort(
          (a, b) => a.price - b.price
      );
    }

    if (sort === "desc") {
      filtered.sort(
          (a, b) => b.price - a.price
      );
    }

    return filtered;
  }, [products, search, onlyAvailable, sort,]);

  return (
      <div className={styles.catalogLayout}>
        <div className={styles.catalogSidebar}>
          <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />

          <label>
            <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={() => setOnlyAvailable(!onlyAvailable)}
            />
            Только в наличии
          </label>

          <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Сортировка</option>
            <option value="asc">Цена: по возрастанию</option>
            <option value="desc">Цена: по убыванию</option>
          </select>
        </div>

        <div className={styles.catalogMain}>
          <Link to="/" className={styles.backLink}> ← Назад </Link>

          <h1 className={styles.categoryTitle}>{categoryName}</h1>

          {loading && (
              <div className={styles.loading}>
                Загрузка товаров...
              </div>
          )}

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

          {!loading && !error && (
              <div className={styles.productsGrid}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                        <CatalogItem key={p.id} product={p} />
                    ))
                ) : (
                    <div className={styles.emptyProducts}>Товары не найдены</div>
                )}
              </div>
          )}
        </div>
      </div>
  );
}