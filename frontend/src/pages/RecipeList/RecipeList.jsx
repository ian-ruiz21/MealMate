import { Link } from "react-router-dom";

export default function RecipeList (props) {
    return (
        <div>
        <h1>Recipes</h1>
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