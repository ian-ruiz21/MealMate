import { Link } from "react-router-dom";
import styles from "./MyRecipesPage.module.css";

export default function MyRecipesPage(props) {
  const userRecipes = props.recipes.filter(
    (recipe) => recipe.author._id === props.user._id
  );
  
  const placeholderImage = "https://i.imgur.com/zr92UU1.png";
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Recipes</h1>
      <ul className={styles.recipeList}>
        {userRecipes.length > 0 ? (
          userRecipes.map((recipe) => (
            <li key={recipe._id} className={styles.recipeItem}>
              <Link to={`/recipes/${recipe._id}`} className={styles.recipeLink}>
                <img
                  src={recipe.photo || placeholderImage}
                  alt={recipe.title || "No image available"}
                  className={styles.recipeImage}
                />
                <div className={styles.recipeTitle}>{recipe.title}</div>
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
