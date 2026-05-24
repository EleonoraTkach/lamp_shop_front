import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminCategoryItem from "./AdminCategoryItem";
import styles from "../styles/category.module.css";

import {loadCategories, deleteCategory, updateCategory,addCategory} from "../../store/actions/categoryActions";

const ALL_CATEGORIES = {
    id: "all",
    name: "Все товары",
};

export default function AdminCategories() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { categories, loading, error } = useSelector(
        (state: any) => state.categories
    );

    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);

    const openCategory = (id: string | number) => {
        navigate(`/admin/catalog/${id}`);
    };

    return (
        <div className={styles.categoriesContainer}>
            <h1>Категории</h1>

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
            {!loading && !error && (
                <>
                <button
                    className={styles.categoryCard}
                    onClick={() => {
                        const name = prompt(
                            "Введите название категории"
                        );

                        if (name?.trim()) {
                            dispatch(addCategory(name));
                        }
                    }}
                >
                    + Добавить категорию
                </button>
                <div className={styles.categoriesGrid}>
                    <div
                        className={styles.categoryCard}
                        onClick={() => openCategory("all")}
                    >
                        {ALL_CATEGORIES.name}
                    </div>

                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => openCategory(cat.id)}
                        >
                            <AdminCategoryItem
                                category={cat}
                                onDelete={(id) =>
                                    dispatch(deleteCategory(id))
                                }
                                onUpdate={(id, name) =>
                                    dispatch(updateCategory(id, name))
                                }
                            />
                        </div>
                    ))}
                </div>
                </>
            )}

        </div>
    );
}