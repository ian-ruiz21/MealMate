import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as recipeService from "../../services/recipeService";

const RecipeDetails = () => {
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await recipeService.show(recipeId);
      setRecipe(recipeData);
    };
    fetchRecipe();
  }, [recipeId]);


  if (!recipe) return <main>Loading...</main>;
  return (
    <main>
      <header>
        <p>{recipe.category?.toUpperCase()}</p>
        <h1>{recipe.title}</h1>
        <p>
          {recipe.author.username} posted on{" "}
          {new Date(recipe.createdAt).toLocaleDateString()}
        </p>
      </header>
      <p>{recipe.description}</p>
      <section>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </section>
      {recipe.photo && (
        <section>
          <h2>Recipe Photo</h2>
          <img src={recipe.photo} alt={`${recipe.title} photo`} />
        </section>
      )}
    </main>
  );
};

export default RecipeDetails;
