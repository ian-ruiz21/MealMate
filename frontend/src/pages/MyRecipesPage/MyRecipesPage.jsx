import { Link } from "react-router-dom";

export default function PostListPage(props) {
  const userRecipes = props.recipes.filter(
    (recipe) => recipe.author._id === props.user._id
  );

  return (
    <div>
      <h1>Your Recipes</h1>
      <ul>
        {userRecipes.length > 0 ? (
          userRecipes.map((recipe) => (
            <li key={recipe._id}>
              <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
            </li>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </ul>
    </div>
  );
}