import { Link } from "react-router-dom";
import styles from "./RecipeList.module.css"; 

export default function RecipeList(props) {
    const placeholderImage = "https://i.imgur.com/zr92UU1.png"; 

    return (
        <div className={styles.recipeListContainer}>
            <h1 className={styles.heading}>All Recipes</h1>
            <ul className={styles.recipeList}>
                {props.recipes.map((recipe) => (
                    <li key={recipe._id} className={styles.recipeItem}>
                        <Link className={styles.recipeLink} to={`/recipes/${recipe._id}`}>
                            <img
                                src={recipe.photo || placeholderImage}
                                alt={recipe.title || "No image available"}
                                className={styles.recipeImage}
                            />
                            <div className={styles.recipeTitle}>{recipe.title}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
