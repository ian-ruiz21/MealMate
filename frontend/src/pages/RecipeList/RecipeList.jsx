import { Link } from "react-router-dom";
import "./RecipeList.css";

export default function RecipeList (props) {
    return (
        <div className="recipe-list-container">
        <h1>All Recipes</h1>
        <ul>
            {props.recipes.map((recipe) => (
            <li key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
            </li>
            ))}
        </ul>
        </div>
    );
}