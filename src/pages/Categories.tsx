import { Link } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch, useSelector,} from "react-redux";

import { loadCategories  } from "../store/actions/categoryActions";
import styles from "./styles/category.module.css";

export default function Categories() {
  const dispatch = useDispatch();

  const {categories, loading, error,} = useSelector(
      (state) => state.categories
  );

  useEffect(() => {
    dispatch(loadCategories ());
  }, [dispatch]);

  return (
      <div className={styles.categoriesContainer}>
        <h1 className={styles.categoriesTitle}>
          Категории
        </h1>

        {loading && (
            <div className={styles.loading}>
              Загрузка категорий...
            </div>
        )}

        {error && (
            <div className={styles.errorBlock}>
              <h2 className={styles.errorTitle}>
                Ошибка загрузки
              </h2>

              <p className={styles.errorText}>{error}</p>
            </div>
        )}

        {!loading && !error && (
            <div className={styles.categoriesGrid}>
              <Link
                  to="/catalog"
                  className={styles.categoryCard}
              >
                Все товары
              </Link>

              {categories.map((cat) => (
                  <Link
                      key={cat.id}
                      to={`/catalog/${cat.id}`}
                      state={{ categoryName: cat.name }}
                      className={styles.categoryCard}
                  >
                    {cat.name}
                  </Link>
              ))}
            </div>
        )}
      </div>
  );
}