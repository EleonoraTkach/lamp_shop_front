import styles from "../styles/category.module.css";

export default function AdminCategoryItem({category,onDelete,onUpdate}){
    return (
        <div className={styles.categoryCard}>
            <span className={styles.categoryName}>
                {category.name}
            </span>

            <div className={styles.categoryActions}>
                <button
                    className={styles.categoryBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        const newName = prompt(
                            "Новое название:",
                            category.name
                        );

                        if (!newName?.trim()) return;

                        onUpdate(category.id, newName);
                    }}
                >
                    Обновить
                </button>

                <button

                    className={`${styles.categoryBtn} ${styles.deleteBtn}`}
                    onClick={(e) =>{
                        e.stopPropagation();
                        onDelete(category.id)
                    }}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
}