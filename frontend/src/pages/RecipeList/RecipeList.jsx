import { Link } from "react-router-dom";
import styles from "./RecipeList.module.css"; 

export default function RecipeList(props) {
    return (
        <div className={styles.recipeListContainer}>
            <h1 className={styles.heading}>All Recipes</h1>
            <ul className={styles.recipeList}>
                {props.recipes.map((recipe) => (
                    <li key={recipe._id} className={styles.recipeItem}>
                        <Link className={styles.recipeLink} to={`/recipes/${recipe._id}`}>
                            {recipe.photo && (
                                <img
                                    src={recipe.photo}
                                    alt={`${recipe.title}`}
                                    className={styles.recipeImage}
                                />
                            )}
                            <div className={styles.recipeTitle}>{recipe.title}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
