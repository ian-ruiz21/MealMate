import { Link } from "react-router-dom";
import styles from "./MyRecipesPage.module.css";

export default function MyRecipesPage(props) {
  const userRecipes = props.recipes.filter(
    (recipe) => recipe.author._id === props.user._id
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Recipes</h1>
      <ul className={styles.recipeList}>
        {userRecipes.length > 0 ? (
          userRecipes.map((recipe) => (
            <li key={recipe._id} className={styles.recipeItem}>
              <Link to={`/recipes/${recipe._id}`} className={styles.recipeLink}>
                {recipe.title}
              </Link>
            </li>
          ))
        ) : (
          <p className={styles.noRecipes}>No recipes found.</p>
        )}
      </ul>
    </div>
  );
}
